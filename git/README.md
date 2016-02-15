<!-- github markdown syntax: https://help.github.com/articles/basic-writing-and-formatting-syntax/ -->

# GIT
## Branches:
- ** Master ** - the production codebase.
- ** Develop ** - all code ready for production on staging environment.
- ** Feature ** - active code development. Usually related to one ticket.
- ** Release ** - integration branch to test develop merging into master.
- ** Hotfix ** - emergency fix to production site.
![](https://datasift.github.io/gitflow/GitFlowHotfixBranch.png)

![](http://www.geekgumbo.com/wp-content/uploads/2011/08/nvie-git-workflow-commands.png)

## Braches commands:
- Show all brahches (`-a` means show not only local branches, but also remote): `git branch -a`
- Create new branch based on current and switch to it: `git checkout -b new_branch`
- Create new branch based on current: `git branch new_branch`
- Merge branches:
Checkout branch you want to merge to: `git checkout develop`
Upply changes from new_branch to develop: `git merge new_branch`
- Show all brahches `git status`