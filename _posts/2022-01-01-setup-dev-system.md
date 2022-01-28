1. [Install WSL2](https://docs.microsoft.com/en-us/windows/wsl/install)
1. [Install Ubuntu](https://wiki.ubuntu.com/WSL#Ubuntu_on_WSL)
1. Install [Microsoft Terminal](https://github.com/Microsoft/Terminal)
11. Under ```Startup``` setup Default profile to WSL distro
11. Optional if you want a white background. In the Microsoft Terminal under ```Color Schemes``` create a new Color Scheme with: Foreground Black, Background White, Cursor color Grey, and Selection Background as Grey, Yellow as Gold
1. Optional, use [Color Tool](https://github.com/microsoft/terminal/tree/main/src/tools/ColorTool) to change the theme. Needs to be extracted and run via ```Powershell``` terminal not Ubuntu
11. To use the [Github](https://raw.githubusercontent.com/mbadolato/iTerm2-Color-Schemes/master/schemes/Github.itermcolors) theme use ```.\ColorTool.exe github.itermcolors```
1. Install [zsh](https://www.zsh.org/)
1. Git Clone [Dotfiles GitHub repo])https://github.com/z1g1/Dotfiles)
11. If you edit the .zshrc edit in this repo and the sim link below will source it
1. Create a symlink off of the Dotfiles repo into the home directory. This will allow for you to source control this file 
11. .zshrc file ```ln -s projects/Dotfiles/.zshrc ~/.zshrc``` 
11. .tmux.conf file ```ln -s projects/Dotfiles/tmuxSessionDev ~/.tmux/tmuxSessionDev``` 
11. .vimrc file ```ln -f -s projects/Dotfiles/.vimrc ~/.vimrc``` 
1. Set default shell to zsh with ```chsh``` followed by ```/usr/bin/zsh```



## User Script for AWS Host 
1. Update and upgrade host on boot
1. remove .zshrc and .vimrc scripts
1. copy my .zshrc and .vimrc scripts from Github
1. Change shell to zsh

```
sudo apt-get update
sudo apt-get upgrade -y
rm /home/ubuntu/.zshrc
rm /home/ubuntu/.vimrc
curl https://raw.githubusercontent.com/z1g1/Dotfiles/master/.zshrc > /home/ubuntu/.zshrc
curl https://raw.githubusercontent.com/z1g1/Dotfiles/master/.vimrc >> /home/ubuntu/.vimrc
sudo chsh -s /usr/bin/zsh
```