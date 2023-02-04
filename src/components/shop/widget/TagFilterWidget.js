import React, {Fragment} from 'react';



function TagFilterWidget({setFilter}) {

    return (
        <Fragment>
            <div className="widget ecom widget_product_tag_cloud">
                <h3>Filter by Product tags</h3>
                <div className="tagcloud">
                    <a href="#" className="tag-cloud-link" onClick={e => setFilter('tag=Featured')}>Featured</a>
                    <a href="#" className="tag-cloud-link" onClick={e => setFilter('tag=Special Offer')}>Special Offer</a>
                </div>
            </div>
        </Fragment>
    );
}

export default TagFilterWidget;