import React, { Component } from "react";
import {
	ReactiveBase,
	DataController,
	ResultCard,
	SelectedFilters
} from "@appbaseio/reactivesearch";
import ResponsiveStory from "./ResponsiveStory";

export default class DataControllerRSDefault extends Component {
	componentDidMount() {
		ResponsiveStory();
	}

	customQuery(value) {
		return {
			query: {
				match_all: {}
			}
		};
	}

	onData(data) {
		const res = data._source;
		const result = {
			image: "https://www.enterprise.com/content/dam/global-vehicle-images/cars/FORD_FOCU_2012-1.png",
			title: res.name,
			rating: res.rating,
			desc: res.brand
		};
		return result;
	}

	render() {
		const { children, ...props } = this.props;
		return (
			<ReactiveBase
				app="car-store"
				credentials="cf7QByt5e:d2d60548-82a9-43cc-8b40-93cbbe75c34c"
			>
				<div className="row">
					<div className="col">
						<SelectedFilters componentId="CustomSensor" />
						<DataController
							componentId="CustomSensor"
							dataField="name"
							customQuery={this.customQuery}
							{...props}
						>
							{children}
						</DataController>
					</div>

					<div className="col">
						<ResultCard
							componentId="SearchResult"
							dataField="name"
							title="Results"
							from={0}
							size={20}
							onData={this.onData}
							react={{
								and: "CustomSensor"
							}}
						/>
					</div>
				</div>
			</ReactiveBase>
		);
	}
}
