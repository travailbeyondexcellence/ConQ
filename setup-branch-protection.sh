#!/bin/bash

# Setup Branch Protection Rules for ConQ Repository
# This script configures branch protection for main and dev branches

set -e

# Repository details
OWNER="travailbeyondexcellence"
REPO="ConQ"

echo "🔐 Setting up branch protection rules for $OWNER/$REPO"
echo "=================================================="
echo ""

# Check if gh CLI is authenticated
if ! gh auth status > /dev/null 2>&1; then
    echo "❌ GitHub CLI is not authenticated. Please run:"
    echo "   gh auth login"
    echo ""
    echo "Then run this script again."
    exit 1
fi

# Get the authenticated user (repository owner)
AUTHENTICATED_USER=$(gh api user --jq .login)
echo "✅ Authenticated as: $AUTHENTICATED_USER"
echo ""

# Function to set up branch protection
setup_branch_protection() {
    local BRANCH=$1
    echo "🔒 Setting up protection for '$BRANCH' branch..."

    # Create branch protection rule using GitHub API
    gh api \
        --method PUT \
        -H "Accept: application/vnd.github+json" \
        -H "X-GitHub-Api-Version: 2022-11-28" \
        /repos/$OWNER/$REPO/branches/$BRANCH/protection \
        --input - <<EOF
{
    "required_status_checks": null,
    "enforce_admins": false,
    "required_pull_request_reviews": null,
    "restrictions": {
        "users": ["$AUTHENTICATED_USER"],
        "teams": [],
        "apps": []
    },
    "allow_force_pushes": false,
    "allow_deletions": false,
    "required_conversation_resolution": false,
    "lock_branch": false,
    "allow_fork_syncing": false,
    "block_creations": false,
    "required_linear_history": false
}
EOF

    if [ $? -eq 0 ]; then
        echo "✅ Protection enabled for '$BRANCH' branch"
    else
        echo "⚠️  Failed to set protection for '$BRANCH' branch"
    fi
    echo ""
}

# Alternative: Using simpler gh CLI commands (if the API approach doesn't work)
setup_branch_protection_simple() {
    local BRANCH=$1
    echo "🔒 Setting up protection for '$BRANCH' branch (simple mode)..."

    # This uses the gh CLI wrapper for branch protection
    gh repo set-default $OWNER/$REPO

    # Create the protection rule
    gh api \
        --method PUT \
        repos/$OWNER/$REPO/branches/$BRANCH/protection \
        -f enforce_admins=false \
        -f required_status_checks=null \
        -f restrictions:users[]="$AUTHENTICATED_USER" \
        -f required_pull_request_reviews=null \
        -f allow_force_pushes=false \
        -f allow_deletions=false

    if [ $? -eq 0 ]; then
        echo "✅ Protection enabled for '$BRANCH' branch"
    else
        echo "⚠️  Failed to set protection for '$BRANCH' branch"
    fi
    echo ""
}

# Check if branches exist
echo "📋 Checking branches..."
BRANCHES=$(gh api repos/$OWNER/$REPO/branches --jq '.[].name')
echo "Available branches:"
echo "$BRANCHES" | grep -E "^(main|dev)$" || true
echo ""

# Set up protection for main branch
if echo "$BRANCHES" | grep -q "^main$"; then
    setup_branch_protection "main"
else
    echo "⚠️  'main' branch not found"
fi

# Set up protection for dev branch
if echo "$BRANCHES" | grep -q "^dev$"; then
    setup_branch_protection "dev"
else
    echo "⚠️  'dev' branch not found. Creating it first..."
    git checkout -b dev 2>/dev/null || git checkout dev
    git push -u origin dev
    setup_branch_protection "dev"
fi

echo "🎉 Branch protection setup complete!"
echo ""
echo "📊 Current Protection Status:"
echo "============================="

# Show protection status
for BRANCH in main dev; do
    echo ""
    echo "Branch: $BRANCH"
    echo "--------------"

    STATUS=$(gh api repos/$OWNER/$REPO/branches/$BRANCH/protection 2>/dev/null)

    if [ $? -eq 0 ]; then
        echo "✅ Protected"
        echo "  • Direct push restricted to: $AUTHENTICATED_USER"
        echo "  • Force pushes: Disabled"
        echo "  • Deletions: Disabled"
        echo "  • Others must use Pull Requests"
    else
        echo "❌ Not protected"
    fi
done

echo ""
echo "📝 What this means:"
echo "==================="
echo "1. ✅ Only you ($AUTHENTICATED_USER) can push directly to 'main' and 'dev'"
echo "2. ✅ Everyone else must create Pull Requests"
echo "3. ✅ Pull Requests don't require approvals (can self-merge)"
echo "4. ✅ Force pushes are blocked"
echo "5. ✅ Branch deletion is prevented"
echo ""
echo "💡 To add approval requirements later, run:"
echo "   gh api --method PATCH repos/$OWNER/$REPO/branches/BRANCH/protection \\"
echo "     -f required_pull_request_reviews:dismissal_restrictions:users[]='$AUTHENTICATED_USER' \\"
echo "     -F required_pull_request_reviews:required_approving_review_count=1"