
**Attribution:** This dApp and business plan was created by **[Marcos](https://github.com/codesport)** in partnership with Code Sport Labs. His GitHub username is [codesport](https://github.com/codesport). 

* If you would like to contribute to this project, just submit a pull request. 

* If you would like to join our team in official, email your CV and a brief statement on how you would like to contribute to: CodeSportCares@codesport.io


# Executive Summary: Eight Test DAO

**NB:** *Eight Test DAO* is a placeholder name

This DAO creates and uses NFTs as primitives to provide cashflow entitlements, blockchain-based credentialing, proof of provenance, proof of work (completed labor), and proof of attendance (of events) for individuals in real life scenarios.  These programmable 

The contract's address on Polygon's Mumbai testnet is: [0x001fd467d74cc8c3c2e4884a1810d06f082aefe3](https://mumbai.polygonscan.com/address/0x001fd467d74cc8c3c2e4884a1810d06f082aefe3)

The first phase of this project is this NFT minter. The minter issues programmable investor NFTs which convey membership and ownership interest in the DAO.

This minter was built using a React frontend with Node and Express.js on the backend. Automated and programmatic image editing was done using [`jimp-compact`](https://github.com/unjs/jimp-compact) on the backend.



# Navigation

* [Introduction: A Novel Use Case of Non Fungible Tokens (NFTs)](#introduction-a-novel-use-case-of-non-fungible-tokens-nfts)
* [Meeting the Needs of Our Stakeholders](#meeting-the-needs-of-our-stakeholders)
* [Defining the Stakeholders](#defining-the-stakeholders)
* [Giving Stakeholders What They Want](#giving-stakeholders-what-they-want)
* [How Funds Are Allocated](#how-funds-are-allocated)
* [Links, References, and Personal Notes](#links-references-and-personal-notes)
* [Next Steps](#next-steps)


# Introduction: A Novel Use Case of Non Fungible Tokens (NFTs)  

We are a DAO, investment vehicle, and guild for blockchain end users, investors, and builders.  

We offer several novel use cases for NFTs through a mechanism called "Programmable NFTs". 

We envision programmable and utility NFTs as containers of value.  We bind these "containers"  to:

* DAO Capital reserves
* DAO Governance
* Membership and credentials for Access Control and Verification
* Claims to future Cashflows
* Proof of work
* Verifiable chains of Provenance.  

These novel use-cases provide tangible utility and a quantifiable floor to an NFT's intrinsic monetary value.


The below summarizes the first phase of our business and product development roadmap.
 
## Meeting the Needs of Our Stakeholders


The goals of the DAO is to meet the needs of key stakeholders within the blockchain ecosystem:  end users, investors, and blockchain developers.

1. **End users:** some would like to expand beyond DeFi and apply blockchain to use cases specific to their business needs

2. **Investors:** want to fund great teams that work well together.  Teams of skilled and productive developers.

3. **Developers:** want to work on challenging projects they are passionate about. They also would like  to be fairly compensated for their work and have upside in a project's success 

This phase deliverable is a proof of concept for the Investor NFT.  It can be minted on-demand by anyone wants to invest in a group of blockchain devs working together as a team.  

## Defining the Stakeholders

These roles are simplified for discussion purposes. It???s understood that each stakeholder may have multiple roles.

1. **End users** We will focus on mid-to-large companies who either willing to "dip their toes into" or who already have embraced blockchain in the consumer facing aspects of their business.  According to [Decrypt](https://decrypt.co/62411/taco-bell-to-charmin-10-big-brands-jumping-on-nft-bandwagon) and our own [desktop research](https://www.google.com/search?q=brands+using+nfts), such companies would include:

    * Asics
    * Adidas
    * Coca Cola 
    * Crunch Worldwide   
    * GameStop
    * Kellogg's (Pringles)
    * Lululemon
    * McDonald's
    * Nike    
    * Planet Fitness
    * Procter & Gamble (Charmin)
    * Starbucks    
    * Yum Brands (Taco Bell & Pizza Hut)

  
Our value proposition to these marquee brands is that Programmable and Utility NFTs would: 

  * Drive omni-channel  customer engagement 
  * Increase positive brand awareness 
  * Increase sales within novel sales channels and funnels.

  

2. **Investors** are obvious. Professional investors also want to invest in proven teams who are honest and ethical! They expect an eventual profit and return on capital risked
3.  **Developers** are people like me who can build apps but are often burdened by end users who think apps get built for free.

## Giving Stakeholders What They Want

1. **End users** to be able to directly commission (and own), crowdfund, or simply support the applications they want built
2. **Investors** with patient capital gain access to profitable investment vehicle and have a claim on all assets and profits generated by the DAO. This includes access to any future dividends and returns of capital
3. **Independent, open source, and freelance** developers are be fairly compensated and rewarded for their work.

## How Funds Are Allocated

80 to 90% of the funding provided by end users goes into developer salaries to fund product development.  The remaining 10% to 20% is kept in the treasury???s rainy-day reserve fund.

Investors are purchasing equity ownership in the DAO. They have a direct claim on all the assets based on their ownership percent. They pay a 5%-10% haircut which goes into the Treasury???s rainy-day reserve fund.

Developers get salaries and milestone bonuses based on building applications that end-users want and within schedule. Developers are also eligible for ownership awards based team member and end user feedback.

**Treasury funds:** The rainy-day fund will be used to fund core-team developers??? salaries  when business is slow. Funds may also be invested in conservative fixed income strategies from Element Finance or Ethereum  token staking


## Links, References, and Personal Notes

[WithTally Governance Dashboard](https://www.tally.xyz/governance/eip155:80001:0x336827b17909B59439C4291B05929b42f271635B) 



**Polygon Mumbai:** The minting contract's address on Polygon's Mumbai testnet is: [0x001fd467d74cc8c3c2e4884a1810d06f082aefe3](https://mumbai.polygonscan.com/address/0x001fd467d74cc8c3c2e4884a1810d06f082aefe3)

**IPFS:** A user-minted NFT and the associated JSON metadata are pinned to IPFS.  Here's a browser friendly URLs are provided by [Pinata](https://gateway.pinata.cloud/ipfs/QmNQhgwK9CncchySHzypPUhFwPFuQPxAkhH3Z8D9ynpBUe).


### Mumbai Testnet Contract Addresses

**Minter:**
```
 npx hardhat run scripts/deploy-eight.js --network mumbai
pinFileToIPFS Output:
{
  IpfsHash: 'QmQT9ixtB9rDSZgrkCza6onTzNULsz3XAftCbGhu1JfAsg',
  PinSize: 38241,
  Timestamp: '2022-03-27T12:49:09.027Z'
}
File URL: https://gateway.pinata.cloud/ipfs/QmQT9ixtB9rDSZgrkCza6onTzNULsz3XAftCbGhu1JfAsg
Contract deployed TO: 0x001fd467D74CC8c3c2e4884a1810D06F082aeFe3
```

**Governor:**
```
$ npx hardhat run scripts/deploy-eightGovernor.js --network mumbai
Contract deployed TO:  0x336827b17909B59439C4291B05929b42f271635B
```

**Timelock:**
```
$ npx hardhat run scripts/deploy-eightTimelock.js --network mumbai
Compiling 47 files with 0.8.12
Solidity compilation finished successfully
Contract deployed TO: 0xdd4447373BB1B868004348fF15FbbEBdE90b5461
```

### Business Model References:

1. [**Andreesen Howoritz:** Building and Running a DAO: Why Governance Matters](https://future.a16z.com/building-and-running-a-dao-why-governance-matters/)
2. [**AtoZ:** A Guide to DeSci, the Latest Web3 Movement](https://future.a16z.com/what-is-decentralized-science-aka-desci)
3. [**AtoZ:**  The Missing Link Between Web2 and Web3: Custody](https://future.a16z.com/missing-link-web2-web3-custody-wallets/)
4. [**AtoZ:**  Building for the 99% Developers](https://future.a16z.com/software-development-building-for-99-developers)
5. [**Tweet Storm:**  Why Do DAOs Struggle to Onboard Contributors](https://twitter.com/jkey_eth/status/1494390904005660675)

### Old Brainstorm and Old Product Roadmap Notes from Frebruary 2022:

> #### Novel Use Case of Non Fungible Tokens (NFTs)
>
> Builders' DAO offers several novel use cases for NFTs through a mechanism called "Programmable NFTs"
> 
> 1. We allow NFTs to represent and entitle holders to either (a) perpetual, (b) limited with expiry, (c) continuous, or (d) discrete claims on future cashflows based on
>
>   * Amount of ETH staked by a member (Founder NFTs)
>   * Satisfactory completion of time based labour services performed by a member (Builder NFTs)
>
> 2. Additionally, we exploit NFTs as primitives to provide blockchain-based credentialing, proof of provenance, proof of work (completed labor), proof of  attendance (of events), for individuals in real life scenarios.  
>
>   * Proof of Work/Contribution: Verifies satisfactory completion of time-based labour services performed by a member
>   * Proof of Ownership: Attestation of ownership and therfore a claim on cashflows from a revenue generating product or business
>   * Proof of Attendance/Completion: Confirms attendance and/or completion of classes/courses/homework from an educational institutions
>   * Proof of Provenance/Origin: Attests that NFT was issued by a smart contract owned and deployed by a specific entity (e.g., a school/educational institution, individual, or any organizational entity)
>
>These NFTs may not be resold and are permanently tied to a members ETH Address.

### Technical Resources on Payment Splitters:

* https://docs.openzeppelin.com/contracts/2.x/api/payment
* https://medium.com/codex/how-to-use-openzeppelins-paymentsplitter-8ba8de09dbf
* https://medium.com/northwest-nfts/announcing-paymentsplitter-io-9b27eccfacd4


## Next Steps
Test Governance token functionality with Tally. Deploy minter to a live website via vercel or heroku.

Assemble a core-team of at least 3 blockchain developers.

In the near future, money splitting will be added to this NFT so as to payout dividends or any excess earnings to owners.  
