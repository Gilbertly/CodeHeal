# Github Action CodeHeal
Github Action that tries to heal your code on build errors by opening a PR with potential code fixes.

## Steps
- If build error,
  - Output files with error and a fix suggeston,
  - Checkout branch-name with suffix `{branchName}-fix`,
  - Open PR to `{branchName}` with description,
  - Tag `{branchName}` author for approval.
  - Success ✨
- Else, proceed.
