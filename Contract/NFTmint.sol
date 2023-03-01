// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts@4.8.1/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.8.1/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts@4.8.1/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.8.1/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts@4.8.1/access/Ownable.sol";
import "@openzeppelin/contracts@4.8.1/utils/Counters.sol";

contract NFTBILLS is ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("NFTBILLS", "NBIL") {}

    function safeMint(address to, string memory uri) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }
    

	struct Organizations {
        address orgaddress;
		string name;
		string gstno;
        address[] sellers;
        uint[] tokens;
	}

    mapping(uint => Organizations) private _Organizations;
    // The following functions are overrides required by Solidity
    uint private _orgids = 0;

function ListOrganization(string memory name, string memory gstno) external {
        address[] memory arr;
        uint[] memory str;
		Organizations memory org = Organizations(
			msg.sender,
			name,
			gstno,
            arr,
            str
		);

		_orgids++;
		_Organizations[_orgids] = org;
}


function registerSeller(address selleraddress,uint orgid) external {
        Organizations storage org = _Organizations[orgid];
        org.sellers.push(selleraddress);
}

function checktokens(uint orgid) external view returns(uint[] memory) {
        Organizations storage org = _Organizations[orgid];
        require(msg.sender != org.orgaddress, "Only Organization Owner can see claiming tokens" );
        return org.tokens;
}

function isMember(uint index,address x) public view returns(bool isIndeed) {
         Organizations storage org = _Organizations[index];
         for (uint i = 0; i < org.sellers.length; i++) {
            if (org.sellers[i] == x) {
            return true;
        }
    }
        return false;
}

function claim(uint claimreq,uint orgid) public returns(bool success){
        Organizations storage org = _Organizations[orgid];
        org.tokens.push(claimreq);
        return true;
}


function removeSeller(uint index,address seller)public returns(bool success){
  Organizations storage org = _Organizations[index];
    for (uint i = 0; i < org.sellers.length; i++) {
            if (org.sellers[i] == seller) { 
            org.sellers[i] = org.sellers[ org.sellers.length-1];
            org.sellers.pop();
            return true;
        }
    }
    return false;
}

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

} 
