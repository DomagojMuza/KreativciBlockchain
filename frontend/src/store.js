import Web3 from 'web3'
import ShortTales from "../../build/contracts/ShortTales.json";
import uniqid from "uniqid";
import db from '@/firebase/firebaseInit'

let store = {
    account: undefined,
    tales: [],
    contract: undefined,
    connected: true,

    connectToMeta: function(){
        if (window.ethereum) {
            window.web3 = new Web3(Web3.givenProvider);
            window.ethereum.enable();
            this.contract = new window.web3.eth.Contract(
                ShortTales.abi,
                ShortTales.networks[5777].address                
            );
		}
    },
    nextTales: function(from){
        let to = from + 3;
        console.log(this.tales.length)
        let newL = this.tales.slice(from, to);
        console.log(this.tales.slice(0, 3))
        return newL
    },
    getAllTales: async function(){
        this.tales = []
        this.firstThree = []
        console.log("object");
        try {
            let taleCount = await this.contract.methods.getTalesCount().call({ from: this.account });
            taleCount = parseInt(taleCount)
            console.log(taleCount);
            let counter = 1
            for (taleCount; taleCount >= 0; taleCount--) {
                    let taleData = await this.getTaleData(taleCount)
                if(counter <= 3){
                    this.firstThree.push(taleData)
                    counter++
                }else{
                    this.tales.push(taleData)
                }
                
            } 
            return this.tales
        } catch (error) {
            console.log(error);
            return error
        }   
    },
    getTaleData: async function(taleIndex){
        try {
            let taleAddr = await this.contract.methods.talesList(taleIndex).call({ from: this.account });

            let tale = await this.contract.methods.getStory(taleAddr).call({ from: this.account });
            
            let content = await db.collection('content').doc(tale.id).get()
            return {
                content: content.data().content,
                id: tale.id,
                headline: tale.headline,
                postedBy: tale.postedBy,
                postedAt: new Date(parseInt(tale.postedAt) * 1000)
            }  
        } catch (error) {
            return error
        }
        
    },
    postStory: async function(headline, content) {
        try {
            let id = uniqid()
            await db.collection('content').doc(id).set({content})
            return await this.contract.methods.postStory(id, headline, id).send({ from: this.account });
        } catch (error) {
            return error
        }
    },
    fanArtCount: async function(){
        try {
            return await this.contract.methods.getFanArtCount().call({ from: this.account });
        } catch (error) {
            return error
        }
    },
    talesCount: async function(){
        try {
            return await this.contract.methods.getTalesCount().call({ from: this.account });
        } catch (error) {
            return error
        }
    },
    postComment: async function(postId, comment){
        try {
            return await this.contract.methods.addCommentToPost(postId, comment).send({from: this.account})            
        } catch (error) {
            return error
        }
    },
    getComments: async function(postId){
        try {
            let comments = await this.contract.methods.getComments(postId).call({ from: this.account})
            comments = comments.map((each) =>{
                return{
                    comment: each.comment,
                    postedAt: new Date(parseInt(each.postedAt) * 1000)
                }
            })
        return comments
        } catch (error) {
            return error
        }
    }
}

export default store