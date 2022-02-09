---
layout: post
title:  "Setting up WSL and Ubuntu on Windows"
---

I wanted to get started with writing more online in 2022. I decided to setup a static site hosted out of S3 which I will cover in a future post. However, before taking this step I needed a system that I could work on to build out. I made the check list below for myself and wanted to share it out. As with setting up any computer there are an infinite number of opinions so keep in mind this works for me, but is not the gospel. Where I can I will layout why each step is useful and what it's doing for context. 

1. I am working on a windows computer so I wanted to start with [installing WSL2](https://docs.microsoft.com/en-us/windows/wsl/install) to give myself a Linux command line to operate from. I decided to use [Ubuntu](https://wiki.ubuntu.com/WSL#Ubuntu_on_WSL) as the distro to install.
1. You can run the distro installed from WSL distro via the start menu. However, the [Microsoft Terminal](https://github.com/Microsoft/Terminal) project gives you a number of customization options.
11. Under ```Startup``` setup Default profile to WSL distro
11. Optional if you want a white background. In the Microsoft Terminal under ```Color Schemes``` create a new Color Scheme with: Foreground Black, Background White, Cursor color Grey, and Selection Background as Grey, Yellow as Gold
1. Optional, use [Color Tool](https://github.com/microsoft/terminal/tree/main/src/tools/ColorTool) to change the theme. Needs to be extracted and run via ```Powershell``` terminal not Ubuntu
11. To use the [Github](https://raw.githubusercontent.com/mbadolato/iTerm2-Color-Schemes/master/schemes/Github.itermcolors) theme use ```.\ColorTool.exe github.itermcolors```
1. This command and the rest below will take place in an Ubuntu/WSL terminal. To interact at the command line you need to use a shell. The one I use is [zsh](https://www.zsh.org/). There are many options out there, this is the one I use.
1. I create a projects directory in my home system as a working directory ```mkdir ~/projects```
1. When setting up a linux system you can configure many of the programs on the system with congiguration files stored in your home directoy, colloquially refered to as dotfiles. To make a computer your own these will customize over time, many folks store theirs in a git repo so they don't loose them. I store mine in a public [GitHub repo])https://github.com/z1g1/Dotfiles). To instal use the Git Clone command within the projects directory ```git clone https://github.com/z1g1/z1g1.net.git```. 
11. This will make a copy of all of the dotfiles into the ```projects/Dotfiles``` directory. For programs to find these files and load their config we will use symlinks below
11. The benefit of this seperate folder/symlink setup is that it allows you to version control your files without worrying about picking up detritus from your home directory. If you ever make an edit you don't like you can roll back it via version control. 
1. Create a symlink off of the Dotfiles repo into the home directory. This will allow for you to source control this file 
11. .zshrc file ```ln -s projects/Dotfiles/.zshrc ~/.zshrc``` 
11. .tmux.conf file ```ln -s projects/Dotfiles/.tmux.conf ~/.tmux.conf``` 
11. .vimrc file ```ln -f -s projects/Dotfiles/.vimrc ~/.vimrc``` 
1. Set default shell to zsh with ```chsh``` followed by ```/usr/bin/zsh```

This setup gives you an Ubuntu system running on windows to act as a foundation for a static webiste
