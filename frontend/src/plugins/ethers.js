import Vue from "vue";
import web3 from 'web3'
import ShortTales from "../../../build/contracts/ShortTales.json";

const plugin = {
	async install(Vue) {
        console.log(web3.eth)
			Vue.prototype.$contract = new web3.eth.Contract(
                ShortTales.abi,
                ShortTales.networks[5777].address                
            );
            // let result = await this.contract.methods.postStory(
            //     'asdasf',
            //     "Star wars", 
            //     "Luke, I am your father"
            // ).send({from: account[0]})
            // const event = result.events.postingStory.returnValues
            // console.log(event)
		
	}
};

Vue.use(plugin);