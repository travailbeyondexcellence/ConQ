# Branch Protection Guide for ConQ

## 🚀 Quick Setup

I've created scripts to protect your `main` and `dev` branches. Here's how to use them:

### Step 1: Authenticate GitHub CLI
```bash
gh auth login
```

Choose these options:
- GitHub.com
- HTTPS
- Login with web browser

### Step 2: Run the Protection Script
```bash
cd /home/zenith/Desktop/Code/ConQ
./protect-branches.sh
```

## 🔒 What This Does

The script sets up the following rules for **both** `main` and `dev` branches:

| Rule | Setting |
|------|---------|
| **Direct Push** | Only YOU (repository owner) |
| **Everyone Else** | Must use Pull Requests |
| **PR Approvals** | Not required (can self-merge) |
| **Force Push** | Blocked |
| **Branch Deletion** | Blocked |
| **Bypass for Admin** | No (even you follow the rules) |

## 📝 Manual Commands (If Scripts Don't Work)

### Protect Main Branch
```bash
gh api \
  --method PUT \
  repos/travailbeyondexcellence/ConQ/branches/main/protection \
  --field enforce_admins=false \
  --field required_status_checks=null \
  --field required_pull_request_reviews=null \
  --field restrictions='{"users":["YOUR_USERNAME"],"teams":[],"apps":[]}' \
  --field allow_force_pushes=false \
  --field allow_deletions=false
```

### Protect Dev Branch
```bash
gh api \
  --method PUT \
  repos/travailbeyondexcellence/ConQ/branches/dev/protection \
  --field enforce_admins=false \
  --field required_status_checks=null \
  --field required_pull_request_reviews=null \
  --field restrictions='{"users":["YOUR_USERNAME"],"teams":[],"apps":[]}' \
  --field allow_force_pushes=false \
  --field allow_deletions=false
```

## 🔍 Check Protection Status

### View Protection Rules
```bash
# For main branch
gh api repos/travailbeyondexcellence/ConQ/branches/main/protection

# For dev branch
gh api repos/travailbeyondexcellence/ConQ/branches/dev/protection
```

### Quick Status Check
```bash
# Check if branches are protected
gh api repos/travailbeyondexcellence/ConQ/branches \
  --jq '.[] | select(.name=="main" or .name=="dev") | {name: .name, protected: .protected}'
```

## 👥 Workflow for Team Members

Since others can't push directly, they must:

### 1. Create Feature Branch
```bash
git checkout dev
git pull origin dev
git checkout -b feature/my-feature
```

### 2. Push Feature Branch
```bash
git push origin feature/my-feature
```

### 3. Create Pull Request
```bash
gh pr create --base dev --title "My Feature" --body "Description"
```

### 4. Merge Their Own PR (No Approval Needed)
```bash
gh pr merge --merge
```

## 🔧 Modify Protection Rules

### Add Approval Requirements (Later)
```bash
# Require 1 approval for main
gh api --method PATCH \
  repos/travailbeyondexcellence/ConQ/branches/main/protection \
  --raw-field required_pull_request_reviews='{"required_approving_review_count":1}'

# Require 2 approvals for main
gh api --method PATCH \
  repos/travailbeyondexcellence/ConQ/branches/main/protection \
  --raw-field required_pull_request_reviews='{"required_approving_review_count":2}'
```

### Add Status Checks
```bash
# Require tests to pass
gh api --method PATCH \
  repos/travailbeyondexcellence/ConQ/branches/main/protection \
  --raw-field required_status_checks='{"strict":true,"contexts":["continuous-integration/travis-ci"]}'
```

### Remove Protection (Emergency)
```bash
# Remove protection from main
gh api --method DELETE \
  repos/travailbeyondexcellence/ConQ/branches/main/protection

# Remove protection from dev
gh api --method DELETE \
  repos/travailbeyondexcellence/ConQ/branches/dev/protection
```

## 🎯 Your Current Workflow

As the repository owner, you can:

1. **Push directly to main and dev**
```bash
git push origin main
git push origin dev
```

2. **Merge from dev to main**
```bash
git checkout main
git merge dev
git push origin main
```

3. **Or use PR workflow (recommended for tracking)**
```bash
gh pr create --base main --head dev --title "Release v1.0"
gh pr merge --merge
```

## ⚠️ Important Notes

1. **Enforce Admins = false**: This means you (as admin) can bypass rules and push directly
2. **No PR Reviews Required**: Team members can merge their own PRs
3. **Restrictions**: Only you are in the allowed users list
4. **Protection applies to**: Direct pushes, force pushes, and deletions

## 🚨 Troubleshooting

### "Not Found" Error
- Make sure the branch exists on remote
- Check repository name is correct
- Verify you have admin access

### "Validation Failed" Error
- User might not exist or be spelled correctly
- JSON format might be incorrect

### "Forbidden" Error
- You need admin access to the repository
- GitHub token might not have required permissions

### Check Your Permissions
```bash
gh api repos/travailbeyondexcellence/ConQ/collaborators/YOUR_USERNAME/permission
```

## 📋 Scripts Created

1. **`protect-branches.sh`** - Main protection script with colored output
2. **`setup-branch-protection.sh`** - Alternative script with more options
3. **`BRANCH_PROTECTION_GUIDE.md`** - This guide

## ✅ Verification Checklist

After running the script, verify:

- [ ] GitHub CLI is authenticated
- [ ] Dev branch exists
- [ ] Main branch is protected
- [ ] Dev branch is protected
- [ ] Only you can push directly
- [ ] Others get "protected branch" error
- [ ] PRs can be created without approval
- [ ] Force push is blocked

---

**Quick Test**: Try to push as another user - they should get:
```
! [remote rejected] dev -> dev (protected branch hook declined)
```

But you should be able to push normally! 🚀