import React, { Component } from "react";
import {
	ReactiveBase,
	ReactiveMap,
	RangeSlider,
	SelectedFilters
} from "@appbaseio/reactivemaps";
import ResponsiveStory from "../reactivesearch/ResponsiveStory";

import { Img } from "./Img.js";
const historyPin = require("./placeholder.svg");

export default class RangeSliderMapDefault extends Component {
	constructor(props) {
		super(props);
		this.onPopoverTrigger = this.onPopoverTrigger.bind(this);
	}

	componentDidMount() {
		ResponsiveStory();
	}

	onPopoverTrigger(marker) {
		return (<div className="popoverComponent row" style={{ margin: "0", maxWidth: "300px" }}>
			<span className="imgContainer col s2" style={{ padding: "0" }}>
				<Img src={marker._source.member.photo} />
			</span>
			<div className="infoContainer col s10">
				<div className="nameContainer">
					<strong>{marker._source.member.member_name}</strong>
				</div>
				<div className="description">
					<p style={{ margin: "5px 0", lineHeight: "18px" }}>is going to&nbsp;
						<a href={marker._source.event.event_url} target="_blank">
							{marker._source.event.event_name}
						</a>
					</p>
				</div>
			</div>
		</div>);
	}

	render() {
		return (
			<ReactiveBase
				app="reactivemap_demo"
				credentials="y4pVxY2Ok:c92481e2-c07f-4473-8326-082919282c18"
				type="meetupdata1"
			>
				<div className="row">
					<div className="col">
						<SelectedFilters componentId="RangeSensor" />
						<RangeSlider
							componentId="RangeSensor"
							dataField={this.props.mapping.guests}
							stepValue={2}
							title="RangeSlider"
							range={{
								start: 0,
								end: 8
							}}
							{...this.props}
						/>
					</div>

					<div className="col">
						<ReactiveMap
							dataField={this.props.mapping.location}
							historicalData
							setMarkerCluster={false}
							defaultMapStyle="Light Monochrome"
							autoCenter
							searchAsMoveComponent
							MapStylesComponent
							title="Reactive Maps"
							showPopoverOn="click"
							historicPin={historyPin}
							onPopoverTrigger={this.onPopoverTrigger}
							defaultZoom={5}
							defaultCenter={{ lat: 37.74, lon: -122.45 }}
							react={{
								and: "RangeSensor"
							}}
						/>
					</div>
				</div>
			</ReactiveBase>
		);
	}
}

RangeSliderMapDefault.defaultProps = {
	mapping: {
		guests: "guests",
		location: "location"
	}
};
