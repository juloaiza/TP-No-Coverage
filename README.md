# Front-Ranger

On Ubuntu it will usually be easiest to build from the source repository:

```sh
$ sudo apt-get update
$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
$ sudo apt-get install docker-ce docker-ce-cli containerd.io
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.25.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
$ git clone https://github.com/juloaiza/TP-No-Coverage.git
$ cd TP-No-Coverage
$ sudo docker-compose up -d
```

For first time setup, internet connection and Docker CE are required.

## Rebuild Container

```sh
$ docker-compose build
$ docker-compose up -d
```

## Access

Open Chrome and go to http://localhost/

## Slide Deck

https://docs.google.com/presentation/d/1DHU2eOPL8XYiqDPCtQgQ70I8Bm9JWTH4VWtO-kXESzY/edit#slide=id.p

## Demo Video

https://youtu.be/Tlb997rviMI
