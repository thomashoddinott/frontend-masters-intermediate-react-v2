//try with a class component - no hooks here!
import React from 'react'
import pet from '@frontendmasters/pet'
import Carousel from './Carousel'
import ErrorBoundary from './ErrorBoundary'
import ThemeContext from '../context/ThemeContext'
import { navigate } from '@reach/router'
import Modal from '../modal'

class Details extends React.Component {
  constructor(props) { //ritual to do with class components
    super(props)

    this.state = {
      loading: true,
      showModal: false
    }
  }

  componentDidMount() {
    // throw new Error('lol')

    //componentDidMount is similar to useEffect
    pet.animal(this.props.id) //props still immutable
    .then(({ animal }) => { //arrow fns don't create new context --> so .this will work correctly
        this.setState({
          url: animal.url,
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}, 
                               ${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false
        })
      })
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal})
  adopt = () => navigate(this.state.url)

  render() {
    if (this.state.loading) {
      return <h1>loading ... </h1>
    }

    const { animal, breed, location, description, name, media, showModal } = this.state

    return (
      <div className="details">
        <Carousel
          media={media}
        />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => ( //destructured theme from themeHook 
              <button
                onClick={this.toggleModal}
                style={{backgroundColor: theme}}
              >Adopt {name}
               </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {
            showModal ? (
              <Modal>
                <div>
                  <h1>Would you like to adopt {name}?</h1>
                  <div className="buttons">
                    <button onClick={this.adopt}>Yes</button>
                    <button onClick={this.toggleModal}>No</button>
                  </div>
                </div>
              </Modal>
            ) : null}
        </div>
      </div>
    )
  }
}

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props}/>
      {/* spread props across Details */}
      {/* equivalent to:  */}
      {/* <Details
        id={props.id}
        etc...
      /> */}
    </ErrorBoundary>
  )
}
