![Dynamic Bookmarks Avatar](./doc/icons8_Books_128.png)

# Chrome Dynamic Bookmarks Extension

> Chrome extension which dynamically updates bookmarks based on the specified regular expression

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Introduction](#introduction)
  - [Bookmark manager](#bookmark-manager)
    - [Search bar](#search-bar)
    - [Folder browser](#folder-browser)
    - [Bookmark information](#bookmark-information)
    - [Action buttons](#action-buttons)
      - [Delete](#delete-button)
      - [Edit](#edit-button)
      - [Add](#add-button)
- [FAQ](#faq)
- [Support](#support)
- [License](#license)

## Getting started

## Installation

Currently this extension is not available on Chrome Web Store, since it is still in developement, but you can install it locally in few steps:

1. [Download](https://github.com/DaniloNovakovic/chrome-dynamic-bookmarks/archive/master.zip) or clone current repository
1. Navigate to downloaded folder and run `npm init` in console (ex. cmd/terminal/powershell)
   (Note: you will need to have [node.js](https://nodejs.org/en/) installed on your computer)
1. Once node_modules is installed run `npm run build` to create production build (or `npm run dev` for development one)
1. On your browser search page type in (navigate to) `chrome://extensions/`
1. In the now opened `chrome://extensions/` page turn on the developer mode
1. Expand the Developer dropodown menu (if needed) and press `Load unpacked` button
1. Navigate to the downloaded/cloned local folder of this repository, select `build` folder and click Ok
1. Assuming there are no errors, the extension should load into your browser

## Usage

### Introduction

Lets start off by clicking on the extension icon on top right. <br>

[![Extension Location](./doc/bookmark-popup-location.JPG)]()

<br>

[![Empty Form](./doc/popup-empty-form.PNG)]()

Here we need to enter a name of the bookmark we wish to create,
and a regular expression based on which our bookmark will be updated <br />

As a demonstration, pictures below will show you how we can use this extension to keep track of the playlist on youtube, and the one that we are going to be using is [Regular Expressions Tutorial](https://www.youtube.com/watch?v=r6I-Ahc0HB4&list=PL4cUxeGkcC9g6m_6Sld9Q4jzqdqHd2HiD) by theNetNinja<br />

[![NetNinja RegExp Tutorial front page](./doc/netNinjaRegExpPlaylistPage.PNG)]()

<br>

What now? Well what would you do if you wanted to bookmark this page? You would press the star icon <br>

[![star icon](./doc/regularBookmark.PNG)]()

And the new bookmark would be added pointing to current url with default location of `Other bookmarks` folder.

Same thing is happening here. Once we submit our form a bookmark is gonna be added into `Other bookmarks` folder, except it is gonna be updated whenever we load a new page containing a url matching our regular expression.

But WHAT is a regular expression? Ever looked through page by using CTRL+F? Well regular expression is kinda the same, except it contains special characters which you can find more about by watching playlist that we are already on.
But for now we won't be needing these special characters.

So now that we got that covered, what should our regular expression be?
Well let's have a closer look at the url of the playlist:
<br>

[![playlist url](./doc/playlistUrl.PNG)]()

The `list=` part of the url is the id of the playlist (it is how youtube knows which playlist we are on). What is so great about this? Well let's try clicking on few videos inside a playlist:

[![playlistVideoOne url](./doc/playlistVideoOne.PNG)]()
[![playlistVideoTwo url](./doc/playlistVideoTwo.PNG)]()

Notice how `list=PL4cUxeGkcC9g6m_6Sld9Q4jzqdqHd2HiD` is contained in EVERY video inside a playlist.
Great! That means we can use it.

So what is gonna be our regular expression?

Well it is gonna be `list=PL4cUxeGkcC9g6m_6Sld9Q4jzqdqHd2HiD`, meaning that if a url contains that, then our bookmark will be updated. So let's fill in the form and submit!

[![filling form](./doc/fillingForm.PNG)]()
[![form submited](./doc/formSubmited.PNG)]()

Congrats! You have successfully created your first dynamic bookmark!

### Bookmark manager

So we created our bookmark, but what if we had alot of bookmarks.
How will we know which ones are tracked / dynamic and which ones arent? What if we wanted to untrack? What if we wanted to maybe change our regural expression? Etc.
For these reasons a new extended bookmark manager which focused on these problems had to be made.

There are two ways we can open it:

1. by right clicking on bookmark bar then Bookmark manager
1. by navigating to `chrome://bookmarks`

[![Bookmark manager page](./doc/managerPage.PNG)]()

Once you open bookmark manager on the right will be shown All of the bookmark files. Which ones do you think are dynamic/tracked and which ones are regular bookmarks? You guessed it. The red ones are dynamic ones.

On the left side (sidenav) you can see two main elements.

[![search bar](./doc/searchBar.png)]()

1. Search bar
1. Folder browser / Tree view

So let's take a look at each...

#### Search bar

It might look naive, but this search bar is using... you guessed it? Regular expressions! This allows you to do ALOT of cool stuff.
Here i will just list a few snippets / examples that you can use

- `https` - lists all https links
- `http[^s]` - all http links (without https)
- `http[s]?://w{3}` - http or https links that start with _www_
- `http[s]?://[^w]` - http/https links that DON'T start with _www_
- `http[s]?://.*?\.com/` - http/https links whose domain name ends with _.com_
- `^n` - all bookmarks with bookmark name starting with letter _n_ (or _N_, by default it is not case sensitive)

> To learn more about regular expression watch [theNetNinja tutorial](https://www.youtube.com/watch?v=r6I-Ahc0HB4&list=PL4cUxeGkcC9g6m_6Sld9Q4jzqdqHd2HiD)

#### Folder browser

[![Folder browser](./doc/folderBrowser.PNG)]()

This part should be pretty intuitive. By clicking on folder you open/close it. But also it displays all of the bookmarks that are located inside it (no matter how deep, in my case it will also display children of _WebDesignSites_ folder in my case) on the main section of the screen right of the sidenav.

To help guide you visually folders with **purple** color will contain dynamic / tracked bookmarks which are, as we saw previously filled with **red** color.

Clicking on the folder also selects it, which lets you add/edit/delete it as we will see later, same goes for clicking on bookmark.

> note: you can't edit or delete _Bookmark bar_ and _Other bookmarks_ folders because they are special folders created by chrome

#### Bookmark information

There are two ways to select bookmark:

1. Clicking on it through sidenav
1. By pressing on right most icon from main section

[![displaying bookmark info](./doc/displayingBookmarkInfo.PNG)]()

[![bookmark info section](./doc/bookmarkInfoSection.PNG)]()

Our bookmark information has following informations:

- _title_ - name of the bookmark
- _url_ - url of page that bookmark is currently pointing to (clickable)
- _parent_ - name of parent folder. (clickable)
- _regExp_ - regular expression (will be hidden if it is not dynamic bookmark)
- _history_ - history of 10 most recent links that bookmark was pointing to (for dynamic bookmarks only)

#### Action buttons

You might have noticed that edit and delete buttons have became available once you clicked on a bookmark. Let's have a look at what they do...

##### Delete button

[![Delete button](./doc/deleteButton.PNG)]()

This one is most straightforward out of them all. It deletes currently selected element wheter if it is folder or bookmark, and it selects the parent of the element. If you cannot delete a folder (_ex. Other bookmarks and Bookmarks bar_) it will be greyed out and you won't be able to click it.

##### Edit button

[![Edit button](./doc/editButton.PNG)]()

There are two different scenarios upon pressing edit button:

- Folder is selected - it will prompt you with a form to change it's name
  [![Edit folder form](./doc/editFolderForm.PNG)]()

- Bookmark is selected - it will prompt you with a form to change name, url or regular expression
  [![Edit bookmark form](./doc/editBookmarkForm.PNG)]()

> **Deleting regular expression will UNTRACK the bookmark!**

##### Add button

To open this one hover over it.

[![Add button](./doc/addButton.PNG)]()

Here you are offered with two options:

1. Add folder (topmost icon)
1. Add bookmark

Both will prompt a modal form for you to fill.

> New bookmark/folder will be created inside currently selected directory.

<br />

---

## FAQ

---

## Support

Reach out to me at one of the following places!

- Website at <a href="https://danilonovakovic.github.io/index.html" target="_blank">`danilonovakovic.github.io`</a>
- Linkedin at <a href="https://www.linkedin.com/in/danilo-novakovi%C4%87-821934167/" target="_blank">`DaniloNovakovic`</a>

---

## License

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2018 © [DaniloNovakovic](https://github.com/DaniloNovakovic)
