import React, { PropTypes } from "react";
import ReactDOM from "react-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class GalleryThumb extends React.Component {
  render() {
    return (
      <div className="Gallery__nav__thumb">
        <img
          onClick={this.props.onSelect}
          src={this.props.image}
        />
      </div>
    );
  }
}

class Gallery extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      active: 0
    };
  }

  handleSelect(index) {
    return () => {
      this.setState({
        active: index
      });
    };
  }

  render() {
    const { images } = this.props;
    const { active } = this.state;
    return (
      <div className="Gallery">
        <nav className="Gallery__nav">
          {images.map((img, key) => (
            <GalleryThumb
              image={img}
              key={key}
              onSelect={this.handleSelect(key)}
            />
          ))}
        </nav>
        <div className="Gallery__main">
          <ReactCSSTransitionGroup
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            transitionName="Gallery"
          >
            {images.map((img, index) => (
              index === active ? (
                <img
                  className="Gallery__main__image"
                  key={index}
                  src={img}
                />
              ) : null
            ))}
          </ReactCSSTransitionGroup>
        </div>
      </div>);
  }
}

GalleryThumb.propTypes = {
  image: PropTypes.string.isRequired,
  onSelect: PropTypes.func
};

GalleryThumb.defaultProps = {
  image: ""
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired
};

Gallery.defaultProps = {
  images: []
};

ReactDOM.render(
  <Gallery
    images={[
      "http://harrypotterfanzone.com/wp-content/2015/07/philosophers-stone-theatrical-poster.jpg",
      "http://www.joblo.com/posters/images/full/the-martian-poster.jpg",
      "http://www.impawards.com/intl/israel/2012/posters/lemale_et_hahalal_ver2.jpg"
    ]}
  />, document.getElementById("container"));
