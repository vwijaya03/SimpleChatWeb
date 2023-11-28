## Installation
```bash
$ git clone https://github.com/vwijaya03/SimpleChatWeb.git
$ cd SimpleChatWeb && docker compose  up
```

## Questions

```
Date of submission
■ 28 Nov 2023 18.57

○ Time spent
■ 4 days

○ Assumptions made
■ only mvp product to demo

○ Shortcuts/Compromises made
■ implement lazy load fetch messages, more secure mongodb connection, acl.

■ What would be your approach to ensuring the application is ready for production
(testing)?
- unit & integration testing provide by nestjs
- CI CD

■ How would you ensure a smooth user experience as 1000’s of users start using your
app simultaneously?
- dynamic infrastructure scale up
- caching user data
- handle open / closed connection
- make the query is optimized

■ What key steps would you take to ensure application security?
- auth token
- db acl
- in app acl
- payload sanitation
- network (VPN)


○ What did you not include in your solution that you want us to know about? 
- still learning about docker and the local machine, last time i implement on aws ec2 i can set private IPv4, but i dont know whats in local, because of that i cant use docker for the installation for the backend
```