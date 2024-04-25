---
date: 2024-04-25T14:56
tags: []
---

I’m using a host file to manage different GitHub accounts on WSL. A sample of what I did before was changing `github.com` into the account name that I want to use.

```
git@github.com:snazi/orders-api.git
# Change to 
git@personal:snazi/orders-api.git

git@pdax:PixoPH/pdax-caas-crypto.git
git@pdax:PixoPH/pdax-caas-trade-v2.git
```

As of 2024-04-25, I’m using `github.com-snazi`. I can find this name in `wsl/.ssh/config` file.

```
#snazi personal account
Host github.com-snazi
    HostName github.com
    User git
    IdentityFile ~/.ssh/github-snazi
```

Use the name after `Host` to denote which account the git command will use. Here is a sample command.

```
git clone "git@github.com-snazi:snazi/Alexander.git"
```

If you think you’ve reformatted after 2024-04-25, `github.com-snazi` may not be the same host name.

How to set this up? [source vid](https://www.youtube.com/watch?v=vSeYsk4WYvg) 