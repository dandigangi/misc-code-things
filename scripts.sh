# Pull file names from a directory
dir=~/some_path
for entry in "$dir"/*
do
  echo "$entry"
done