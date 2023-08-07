# BIT-TORRENT

BitTorrent is a peer-to-peer (P2P) communication protocol and technology that allows the distribution and sharing of large files over the internet in a decentralized manner.
I have used GoLang to implement various functionalities in this project which include establishing UDP and TCP connection, sharing and recieving data etc.

Currently this project is limited in scope :
1. It can only download multiple files from peers.
2. Supports only UDP connections for tracker.
3. It can't send files to peers and there is no support for DHT.

Work In Progress :
1. Implementing seeding feature
2. Support for DHT and NAT traversal.
3. Capping download speed

After setting up Environment for GoLang in your device, follow the following procedure to use Bit-Torrent :
1. Open Vs Code or Command Line
2. Clone project with :

       git clone https://github.com/Ashu-0202/BIT-TORRENT

4. Download all required packages with :

       go get .
   
5. Run program using Command Line :  
      go run . "location of torrent file" "download location"

    (Use different files for stdout and stderr for better logging)

       go run . torrent/0.torrent download > output.txt 2> error.txt
  
