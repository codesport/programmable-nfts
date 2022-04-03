
[Defining the Stakeholders]
[Give the Stakeholder What They Want]
[How Funds Are Allocated]
[Next Steps]
[Mumbai Contract Addresses]
[Business Model Reference]
[Technical Resources]

# Executive Summary: A Novel Use Case of Non Fungible Tokens (NFTs)  

We bind NFTs to permanent capital reserves, organizational governance, claims to arbitrary future cashflows, and verifiable chains of provenance. 

These novel use-cases provide tangible utility and a quantifiable floor to an NFT's intrinsic monetary value.

We are a DAO and Guild for blockchain builders, innovators, users. 

Our secondary goal is to become a grass roots incubator for dApps and blockchain-based services.


## Meeting the Needs of the Stakeholder: Chain Block Labs/Builders' DAO/CoderFi:

We meet the needs of every member of the blockchain ecosystem. This includes end users, investors, and blockchain developers.  

1. **Endusers** want to move beyond defi apps and apply blockchain to use cases that impact them personally. 

2. **Investors** want to fund teams of ethical, honest, and productive developers. 

3. **Developer's** we want to to be fairly compensated and work on projects we're passionate abpt

This phase deliverable is a proof of concept for the Investor NFT.  It can be minted on-demand by anyone wants to invest in a group of blockchain devs working together as a team.  

## Defining the Stakeholders

These roles are simplified for discussion purposes. It’s understood that each stakeholder may have multiple roles.

1. **End users** are anyone who wants a blockchain application for their particular use case or business need.  
2. **Investors** are obvious. Professional investors also want to invest in proven teams who are honest and ethical! They expect an eventual profit and return on capital risked
3.  **Developers** are people like me who can build apps but are often burndened by endusers who think apps get built for free.

## Give the Stakeholder What They Want

1. **End users** to be able to directly commision, crowdfund, or simply support the applications they want built
2. **Investors** with patient capital gain access to profitable investment vehicle and have a claim on all assets and profits generated by the DAO. This includes access to any future dividends and returns of capital
3. **Independent, open source, and freelance** developers are be fairly compensated nd rewarded for their work.

## How Funds Are Allocated

80 to 90% of the funding provided by end users goes into developer salaries to fund product development.  The remaining 10% to 20% is kept in the treasury’s rainy-day reserve fund.

Investors are purchasing equity ownership in the DAO. They have a direct claim on all the assets based on their ownership percent. They pay a 5%-10% haircut which goes into the Treasury’s rainy-day reserve fund.

Developers get salaries and milestone bonuses based on building applications that end-users want and within schedule. Developers are also eligible for ownership awards based team member and end user feedback.

**Treasury funds:** The rainy-day fund will be used to fund core-team developers’ salaries  when business is slow. Funds may also be invested in conservative fixed income strategies from Element Finance or Ethereum  token staking

## Next Steps
Test Governance token functionality with Tally. Deploy minter to a live website via vercel or heroku.

Assemble a core-team of at least 3 blockchain developers.

In the near future, money splitting will be added to this NFT so as to payout dividends or any excess earnings to owners.  

## Mumbai Contract Addresses

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

1. [Andreesen Howoritz: Building and Running a DAO: Why Governance Matters](https://future.a16z.com/building-and-running-a-dao-why-governance-matters/)
2. [AtoZ: A Guide to DeSci, the Latest Web3 Movement](https://future.a16z.com/what-is-decentralized-science-aka-desci)
3. [AtoZ: The Missing Link Between Web2 and Web3: Custody](https://future.a16z.com/missing-link-web2-web3-custody-wallets/)
4. [AtoZ: Building for the 99% Developers](https://future.a16z.com/software-development-building-for-99-developers)
5. [Tweet Storm: Why Do DAOs Struggle to Onboard Contributors](https://twitter.com/jkey_eth/status/1494390904005660675)

### Technical Resources:

https://docs.openzeppelin.com/contracts/2.x/api/payment
https://medium.com/codex/how-to-use-openzeppelins-paymentsplitter-8ba8de09dbf
https://medium.com/northwest-nfts/announcing-paymentsplitter-io-9b27eccfacd4

### Old Brainstorm and Old Product Roadmap Notes
[Please Don't Read This. You will Barf]()

