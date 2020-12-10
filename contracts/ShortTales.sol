// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

contract ShortTales {
    struct Tale {
        address postedBy;
        string id;
        string headline;
        string content;
        uint256 postedAt;
        bool exist;
    }

    struct Comment {
        string comment;
        uint256 postedAt;
    }
    mapping(string => Tale) shortTales;
    string[] public talesList;
    string[] public fanArt;

    mapping(string => Comment[]) comments;

    modifier storyExists(string memory _id) {
        Tale memory tale = shortTales[_id];
        require(tale.exist, "Story not found");

        _;
    }
    modifier commentsExist(string memory _postId) {
        Comment[] memory postComments = comments[_postId];
        require(postComments.length > 0, "No comments");

        _;
    }
    event postingStory(
        address postedBy,
        string id,
        string headline,
        string content,
        uint256 postedAt,
        bool exist
    );
    event postingComment(string comment, uint256 postedAt);

    function getTalesCount() public view returns (uint256 talesCount) {
        return talesList.length - 1;
    }

    function getFanArtCount() public view returns (uint256 fanArtCount) {
        return fanArt.length - 1;
    }

    function postFanArt(string memory linkHash) external {
        fanArt.push(linkHash);
    }

    function postStory(
        string memory _id,
        string memory _headline,
        string memory _content
    ) external {
        shortTales[_id] = Tale(
            msg.sender,
            _id,
            _headline,
            _content,
            block.timestamp,
            true
        );
        talesList.push(_id);
        emit postingStory(
            msg.sender,
            _id,
            _headline,
            _content,
            block.timestamp,
            true
        );
    }

    function getStory(string memory id)
        public
        view
        storyExists(id)
        returns (Tale memory)
    {
        return shortTales[id];
    }

    function addCommentToPost(string memory _postId, string memory _comment)
        external
    {
        comments[_postId].push(Comment(_comment, block.timestamp));
        emit postingComment(_comment, block.timestamp);
    }

    function getComments(string memory _postId)
        public
        view
        commentsExist(_postId)
        returns (Comment[] memory)
    {
        return comments[_postId];
    }
}
