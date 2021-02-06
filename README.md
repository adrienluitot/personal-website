# Personal Website

This is the repo of my website, which you can find at [https://adrien.luitot.fr](https://adrien.luitot.fr).

## Why making a git ?

I made this repo for multiple reasons, the principal reason is that I'd like to allow people to copy my website for they own purpose if they want. It might be for a portfolio too, or for a theme, a template...

An other reason is that, sometimes, when I see a bug or a possible improvement on a website I want to fix it, but most of the time the website isn't open source, so I can't do anything and this might be frustrating. To avoid that, I open the sources of this website, although I don't really await for contributions.

## General functionning

The website is splitted into two parts, the main page and the projects. The main page list all the projects separated in categories, when a project is clicked the project's content is loaded into the project "page".

### Folder structure

- `html_templates`: store the pages's templates with the translations' placeholders.
  
  - `index.html`: main page's template this is the file that should be edited for main page's modifications.
  
  - `projects/*/index.html`: templates for the different projects, these are the files that should be edited.

- `locales`: this is the folder for the translations.

- `site`: public folder, where the generated files and assets are.
  
  - `assets`: folder for all the compenents of the website (css, js, fonts...). Any file in this folder can be modified.
  
  - `fr` and other generated translations: these folders store the generated html files by the translation system. They are not on the repo but are created on translations update. Files under these folders must not be modified as they will be overwritten by the translations update. 
  
  - `projects`: contains the projects' generated html files and the style of each project. The html must not be modified here, but styles specific to a project should be written in `site/projects/<project>/proj-style.css`.
  
  - `index.html`: this is the generated main page, it must not be modified here, but in the `html_templates` folder.

- `update_translation.sh`: this is a short shell script that generates the translated files. More information below. *NB: This will only work on linux (and maybe MacOS ?), I haven't made a script for Windows but it should be doable, feel free to make a PR if you made one :D*

### Translation

As I wanted a website easily translatable, I wanted to use an easy and fonctional system so I used [node-static-i18n](https://github.com/claudetech/node-static-i18n), everything to install and use it is explained on the repo.

The translation must be done in two steps to work properly, one for the main page and an other for the projects. The script `update_translation.sh` does it automatically, but for other systems than linux or if you want to do it by hand you can do these commands:

- `static-i18n -l en -i en -i fr --allowHtml --exclude projects --outputDir site html_templates` to update the main page.

- `static-i18n -l en -i en -i fr --allowHtml --exclude index.html --fixPaths false --outputDir site html_templates` to update the projects.

## Installing / Using (linux)

1) Download [node-static-i18n](https://github.com/claudetech/node-static-i18n)

2) Clone the project : `git clone https://github.com/adrienluitot/personal-website.git`

3) Open the folder `cd personal-website`

4) Generate the translation : `./update_translation.sh -a` (or use both commands as shown above)

5) You're done :D the file to open will be `site/index.html`, if you use a web server like nginx or apache, you must set `site/` as the root directory

Now each time you make a modification in `html_templates/` or in `locales/` you have to regenerate the translations.

## Contributing

Even if there shouldn't be too much to do, you are welcome to contribute! There isn't really rules, just fork the project, do your changes, make a pull request and I'll pull if everything is okay!

If you don't want/know to develop, you can just make an issue.

## Making a template or a theme

If you plan to make a template or a theme from this website, my project is under MIT licence so no problem and you can even make money if you want, but I just wish to be cited.

Also don't hesitate to contact me, I will add a link to your theme/template on this file.

## Libraries

You don't need to download them (unless node-static-i18n), it's just that I wanted to cite them.

- [fullPage.js](https://github.com/alvarotrigo/fullPage.js): it allows to scroll the website page/page instead of having a normal scroll.

- [parallax.js](https://github.com/wagerfield/parallax): used for the icons on the main page.

- [Bootstrap](https://github.com/twbs/bootstrap): only use the grid and a small part for the navbar.

- [Font Awesome](https://github.com/FortAwesome/Font-Awesome): used for most of the icons on the website.

- [node-static-i18n](https://github.com/claudetech/node-static-i18n): used for the translation system.
