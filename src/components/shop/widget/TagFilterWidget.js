import React, {Fragment} from 'react';



function TagFilterWidget() {

    return (
        <Fragment>
            <div className="widget ecom widget_product_tag_cloud">
                <h3>Filter by Product tags</h3>
                <div className="tagcloud">
                    <a href="#" className="tag-cloud-link">Featured</a>
                    <a href="#" className="tag-cloud-link">Recent</a>
                </div>
            </div>
        </Fragment>
    );
}

export default TagFilterWidget;