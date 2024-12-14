# CREATE AND UPLOAD

SET USER
git config --global user.email "<auguchencomorales@gmail.com>"
git config --global user.name "Andres Auguchenco"

INITIALIZE OR RESTART
git init

COMMITS
git commit -m "message"

SET MAIN AND ORIGIN
git branch -M main
git remote add origin <git@github.com>:auguchenco/proyecto-final-dev.git
git push -u origin main

---

# DOWNLOAD

TRAER REPO
git pull origin main

---

# OTHERS

STATUS AND COMMITS
git status
git log

REMOVE ORIGIN
git remote remove origin
