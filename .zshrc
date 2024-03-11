# Nothing special Zsh config. Highly advise the plugins.
# Make sure to open a new instance of shells or do source {path/config} to enable changes.
export PATH=$HOME/.yarn/bin:/bin:/usr/local/bin:$PATH

export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="robbyrussell"

plugins=(
  git
  zsh-completions           # https://github.com/zsh-users/zsh-completions
  zsh-autosuggestions       # https://github.com/zsh-users/zsh-autosuggestions
  zsh-syntax-highlighting   # https://github.com/zsh-users/zsh-syntax-highlighting
)

# I don't use these as much but some may enhance your workflow
alias zcon="code ~/.zshrc"
alias zsrc="source ~/.zshrc"
alias omz="cd ~/.oh-my-zsh"
alias ssh="cd ~/.ssh"
alias sshcon="code ~/.ssh/config"
alias gitcon="vim ~/.gitconfig"
alias gits="git status"
alias gitd="git diff"
alias gitl="git lg"
alias gita="git add ."
alias gitc="cz commit"

autoload -U compinit && compinit
source $ZSH/oh-my-zsh.sh

export PNPM_HOME="/Users/dandigangi/Library/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac

# bun completions
[ -s "/Users/dandigangi/.bun/_bun" ] && source "/Users/dandigangi/.bun/_bun"

# bun
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
