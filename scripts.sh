# Pull file names from a directory
dir=~/some_path
for entry in "$dir"/*
do
  echo "$entry"
done

# Dump VS Code extensions list to text file
code --list-extensions > vs-code-extensions.txt

# Dump Homebrew formulas to text file
brew list --full-name > homebrew-formulas.txt