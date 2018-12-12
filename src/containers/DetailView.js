import React, {
    Component
} from 'react';
import axios from 'axios';

class DetailView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailView: {}
        }
    }
    componentDidMount() {
        //replace trailing slash with .json
        if (this.props.location) {
            let slug = this.props.location.pathname.slice(0, -1) + ".json";
            return axios.get(`https://www.healthcare.gov/${slug}`)
                .then(response => {
                    this.setState({
                        detailView: response.data
                    })
                })
                .catch(err => {
                    throw new Error(err);
                });
        }
    }


    render(props) {
        return ( 
          <pre className = "detail-view" > 
            { JSON.stringify(this.state.detailView, null, 4)} 
          < /pre>
        )
    }
}

export default DetailView;