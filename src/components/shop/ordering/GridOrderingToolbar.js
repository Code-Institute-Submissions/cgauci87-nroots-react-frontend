import React, {Fragment} from 'react';

/**
 * Grid Ordering Toolbar component
 */
function GridOrderingToolbar({HandleOrderingStatus, gridOrdering}) {

    return (
        <Fragment>
            <div className="products-sizes">
                <a href="/#" onClick={(event) => {
                    HandleOrderingStatus(event, 1)
                }} className={"grid-4 " + (gridOrdering === 1 ? 'active' : '')}>
                    <div className="grid-draw">
                        <span/><span/><span/><span/>
                    </div>
                    <div className="grid-draw">
                        <span/><span/><span/><span/>
                    </div>
                    <div className="grid-draw">
                        <span/><span/><span/><span/>
                    </div>
                </a>
                <a href="/#" onClick={(event) => {
                    HandleOrderingStatus(event, 2)
                }} className={"grid-3 " + (gridOrdering === 2 ? 'active' : '')}>
                    <div className="grid-draw">
                        <span/><span/><span/>
                    </div>
                    <div className="grid-draw">
                        <span/><span/><span/>
                    </div>
                    <div className="grid-draw">
                        <span/><span/><span/>
                    </div>
                </a>
                <a href="/#" onClick={(event) => {
                    HandleOrderingStatus(event, 3)
                }} className={"list-view " + (gridOrdering === 3 ? 'active' : '')}>
                    <div className="grid-draw-line">
                        <span/><span/>
                    </div>
                    <div className="grid-draw-line">
                        <span/><span/>
                    </div>
                    <div className="grid-draw-line">
                        <span/><span/>
                    </div>
                </a>
            </div>
        </Fragment>
    );
}

export default GridOrderingToolbar;