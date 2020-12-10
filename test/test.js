const ShortTales = artifacts.require('./ShortTales.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Story', ([deployer, author]) => {
    let story
  
    before(async () => {
      story = await ShortTales.deployed()
    })


    describe('deployment', async () => {
        it('deploys successfully', async () => {
          const address = await story.address
          assert.notEqual(address, 0x0)
          assert.notEqual(address, '')
          assert.notEqual(address, null)
          assert.notEqual(address, undefined)
        })
    })

    
    describe('story', async () => {
        let result, storyCount, talesList
        let id = '1jg7fnc8dks5gb0d74'
    
        before(async () => {
            result = await story.postStory(id, "Star wars", "Luke, I am your father")
        })
    
        //check event
        it('post Story', async () => {
          // SUCESS
          const event = result.logs[0].args
          assert.equal(event.id, id, 'Id is correct')
          assert.equal(event.headline, "Star wars", 'Headline correct')
          assert.equal(event.content, 'Luke, I am your father', 'Content is correct')
          assert.equal(event.exist, true, 'Post exists')
        })

        it('lists story', async () => {
            storyCount = await story.getTalesCount()
            storyCount  = parseInt(storyCount.toString())
            taleAddress = await story.talesList(storyCount)
            console.log(taleAddress)
            const fetchedStory = await story.getStory(taleAddress)
            assert.equal(fetchedStory.id, id, 'Id is correct')
            assert.equal(fetchedStory.headline, "Star wars", 'Headline correct')
            assert.equal(fetchedStory.content, 'Luke, I am your father', 'Content is correct')
            assert.equal(fetchedStory.exist, true, 'Post exists')


            //Trebalo bi biti odbaceno
            await story.getStory('dgdfsgsdfs').should.be.rejected;
          })
    })
    
    describe('comment', async () => {
        let result
        let id = '254353694'
    
        before(async () => {
            result = await story.addCommentToPost(id, "Shocking")   
        })
    
        //check event
        it('post Comment', async () => {
          // SUCESS
          const event = result.logs[0].args
          assert.equal(event.comment, "Shocking", 'Correct comment')
        })

        it('lists comments', async () => {
            const fetchedComments = await story.getComments(id)
            assert.equal(fetchedComments[0].comment, "Shocking", 'Correct comment')

            await story.getComments('dasda3').should.be.rejected
        })
    })



})