import CardItem from '../CardItem/CardItem'
import './Cards.css'

function Cards() {
  return (
    <div className='cards'>
      <h1>I dont need this haha!</h1>
      <div class="cards__container">
        <div class="cards__wrapper">
            <ul class="cards__item">
                <CardItem 
                src='images/kalk.jpeg'
                text='Halo'
                label='idk'
                path='/services'
                />
                <CardItem 
                src='images/kalk.jpeg'
                text='Halo'
                label='idk'
                path='/services'
                />
                <CardItem 
                src='images/kalk.jpeg'
                text='Halo'
                label='idk'
                path='/services'
                />
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Cards
