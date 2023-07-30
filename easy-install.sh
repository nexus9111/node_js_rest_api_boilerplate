printf "\033[1mStarting installation process...\n\033[0m"
rm .env.development
rm .env.production
printf "\033[1mCreating .env files...\n\033[0m"
cp .env.example .env.development
cp .env.example .env.production
cp .env.example .env.test

printf "\033[1mFilling .env files unique jwt secret...\n\033[0m"
# Replace "YOUR JWT SECRET" with the generated UUID in each .env file
UUID=$(uuidgen)
awk -v uuid="$UUID" '{gsub(/YOUR JWT SECRET/, uuid)}1' .env.development > .env.development.tmp && mv .env.development.tmp .env.development
UUID=$(uuidgen)
awk -v uuid="$UUID" '{gsub(/YOUR JWT SECRET/, uuid)}1' .env.production > .env.production.tmp && mv .env.production.tmp .env.production
UUID=$(uuidgen)
awk -v uuid="$UUID" '{gsub(/YOUR JWT SECRET/, uuid)}1' .env.test > .env.test.tmp && mv .env.test.tmp .env.test

printf "\033[1m=============== \033[33mDon't forget to edit the .env files!\033[0m \033[1m===============\n\033[0m"
