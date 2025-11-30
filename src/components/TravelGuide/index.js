import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

class Travelguide extends Component {
  state = {travelDetails: [], isLoading: true}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    try {
      const response = await fetch('https://apis.ccbp.in/tg/packages')
      const responseData = await response.json()

      const filteredData = responseData.packages.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        description: each.description,
      }))

      this.setState({travelDetails: filteredData, isLoading: false})
    } catch (error) {
      console.error('Fetch failed', error)
    }
  }

  render() {
    const {travelDetails, isLoading} = this.state

    return !isLoading ? (
      <div className="main-container">
        <h1 className="head">Travel Guide</h1>
        <ul className="places-cont">
          {travelDetails.map(each => (
            <li key={each.id} className="place-box">
              <img src={each.imageUrl} className="img" alt={each.name} />
              <h1 className="place-head">{each.name}</h1>
              <p className="description">{each.description}</p>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <div className="loader-container" data-testid="loader">
        <Loader color="#ffffff" height={50} width={50} />
      </div>
    )
  }
}

export default Travelguide
