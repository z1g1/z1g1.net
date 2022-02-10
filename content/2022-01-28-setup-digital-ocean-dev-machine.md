title: Setting up a development machine on Digital Ocean 
status: draft
category: How To


1. Digital Ocean droplet creates an ubutu image with only ```root``` as the user 
1. Create a new user account ```sudo adduser zack```, and add to the sudo group ```usermod -aG sudo zack```
1. To enable ssh create a ssh folder ```mkdir ~/.ssh```
1. Edit the authorized keys file ```vim ~/.ssh/authorized_keys``` and paste your public key into the file
1. Update the droplet OS ```sudo apt-get update```  and ```sudo apt-get upgrade -y``` 
1. Make a project folder ```mkdir projects```
1. Install zsh ```sudo apt install zsh -y```
1. Git Clone [Dotfiles GitHub repo])https://github.com/z1g1/Dotfiles) for customizations to the systems into the projects directory ```git clone https://github.com/z1g1/Dotfiles.git```
11. Keep and edit the dotfiles in this directory and the sim link below will source it for 
1. Create a symlink off of the Dotfiles repo into the home directory. This will allow for you to source control this file 
11. .zshrc file ```ln -s projects/Dotfiles/.zshrc ~/.zshrc``` 
11. .vimrc file ```ln -f -s projects/Dotfiles/.vimrc ~/.vimrc``` 
1. Set default shell to zsh ```chsh -s /usr/bin/zsh```


11. .tmux.conf file ```ln -s projects/Dotfiles/tmuxSessionDev ~/.tmux/tmuxSessionDev``` 
