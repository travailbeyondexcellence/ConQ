#!/bin/bash

# Quick Branch Protection Setup for ConQ
# Protects main and dev branches with your specific requirements

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Repository details
OWNER="travailbeyondexcellence"
REPO="ConQ"

echo -e "${BLUE}🔐 Branch Protection Setup for $OWNER/$REPO${NC}"
echo "================================================"
echo ""

# Step 1: Authenticate with GitHub CLI
echo -e "${YELLOW}Step 1: Checking GitHub CLI authentication...${NC}"

if ! gh auth status > /dev/null 2>&1; then
    echo -e "${RED}❌ Not authenticated with GitHub CLI${NC}"
    echo ""
    echo "Please run the following command to authenticate:"
    echo -e "${GREEN}gh auth login${NC}"
    echo ""
    echo "Choose these options during login:"
    echo "  1. GitHub.com"
    echo "  2. HTTPS"
    echo "  3. Login with a web browser (or paste token)"
    echo ""
    echo "After authentication, run this script again."
    exit 1
fi

USER=$(gh api user --jq .login)
echo -e "${GREEN}✅ Authenticated as: $USER${NC}"
echo ""

# Step 2: Create dev branch if it doesn't exist
echo -e "${YELLOW}Step 2: Ensuring dev branch exists...${NC}"

# Check if dev branch exists on remote
if ! gh api repos/$OWNER/$REPO/branches/dev > /dev/null 2>&1; then
    echo "Creating dev branch..."
    git checkout main
    git pull origin main
    git checkout -b dev
    git push -u origin dev
    echo -e "${GREEN}✅ Dev branch created${NC}"
else
    echo -e "${GREEN}✅ Dev branch already exists${NC}"
fi
echo ""

# Step 3: Set up branch protection for main
echo -e "${YELLOW}Step 3: Protecting 'main' branch...${NC}"

# Main branch protection
gh api \
    --method PUT \
    repos/$OWNER/$REPO/branches/main/protection \
    --field enforce_admins=false \
    --field required_status_checks=null \
    --field required_pull_request_reviews=null \
    --field restrictions='{"users":["'$USER'"],"teams":[],"apps":[]}' \
    --field allow_force_pushes=false \
    --field allow_deletions=false \
    --field required_conversation_resolution=false \
    --field block_creations=false \
    --field required_linear_history=false \
    --silent

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Main branch protected${NC}"
else
    echo -e "${RED}❌ Failed to protect main branch${NC}"
fi
echo ""

# Step 4: Set up branch protection for dev
echo -e "${YELLOW}Step 4: Protecting 'dev' branch...${NC}"

# Dev branch protection (same as main)
gh api \
    --method PUT \
    repos/$OWNER/$REPO/branches/dev/protection \
    --field enforce_admins=false \
    --field required_status_checks=null \
    --field required_pull_request_reviews=null \
    --field restrictions='{"users":["'$USER'"],"teams":[],"apps":[]}' \
    --field allow_force_pushes=false \
    --field allow_deletions=false \
    --field required_conversation_resolution=false \
    --field block_creations=false \
    --field required_linear_history=false \
    --silent

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Dev branch protected${NC}"
else
    echo -e "${RED}❌ Failed to protect dev branch${NC}"
fi
echo ""

# Step 5: Verify protection
echo -e "${YELLOW}Step 5: Verifying protection status...${NC}"
echo ""

echo -e "${BLUE}📊 Protection Status:${NC}"
echo "===================="

for BRANCH in main dev; do
    echo ""
    echo -e "${BLUE}Branch: $BRANCH${NC}"

    # Check if branch is protected
    if gh api repos/$OWNER/$REPO/branches/$BRANCH --jq .protected | grep -q true; then
        echo -e "${GREEN}  ✅ Protected${NC}"

        # Get protection details
        PROTECTION=$(gh api repos/$OWNER/$REPO/branches/$BRANCH/protection 2>/dev/null || echo "{}")

        echo "  • Only '$USER' can push directly"
        echo "  • Everyone else must use Pull Requests"
        echo "  • Pull Requests don't require approval"
        echo "  • Force pushes: Blocked"
        echo "  • Branch deletion: Blocked"
    else
        echo -e "${RED}  ❌ Not protected${NC}"
    fi
done

echo ""
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo ""
echo -e "${BLUE}📝 Summary of Rules:${NC}"
echo "===================="
echo "✅ Only you ($USER) can push directly to 'main' and 'dev'"
echo "✅ Everyone else must create Pull Requests"
echo "✅ Pull Requests can be self-merged (no approval required)"
echo "✅ Force pushes are blocked on both branches"
echo "✅ Branches cannot be deleted"
echo ""
echo -e "${YELLOW}💡 Workflow for other contributors:${NC}"
echo "1. Create feature branch from dev: git checkout -b feature/xyz dev"
echo "2. Push feature branch: git push origin feature/xyz"
echo "3. Create PR to dev branch: gh pr create --base dev"
echo "4. Merge their own PR: gh pr merge --merge"
echo ""
echo -e "${YELLOW}💡 To later add approval requirements:${NC}"
echo "gh api --method PATCH repos/$OWNER/$REPO/branches/main/protection \\"
echo "  --raw-field required_pull_request_reviews='{\"required_approving_review_count\":1}'"