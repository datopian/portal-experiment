import { simpleToPlotly, plotlyToPlotly } from 'datapackage-render'


/**
 * Prepare views for dataset
 * @params {object} dataset object of the form: 
* { readme: readme,
    readmeHtml: readmeHtml,
    descriptor: descriptor,
    resources: resources 
  }
 */
export default function addView(dataset) {
    const views = dataset.descriptor.views
    const countViews = views ? views.length : 0
    if (countViews === 0) {
        return {
            props: {
                dataset,
                error: true
            }
        }
    }

    for (let i = 0; i < countViews; i++) {
        const view = views[i]
        if (!view.resources[0]._values && view.resources[0].data) {
            view.resources[0]._values = view.resources[0].data
        }
        if (view.specType === 'simple') {

            try {
                const plotlySpec = simpleToPlotly(view)
                if (plotlySpec) {
                    return {
                        props: {
                            dataset,
                            plotlySpec,
                            error: false
                        }
                    }
                }
            } catch (e) {
                return {
                    props: {
                        dataset,
                        plotlySpec,
                        error: true
                    }
                }
            }
        } else if (view.specType === 'plotly') {
            try {
                const plotlySpec = plotlyToPlotly(view)
                if (plotlySpec) {
                    return {
                        props: {
                            dataset,
                            plotlySpec,
                            error: false
                        }
                    }
                }
            } catch (e) {
                return {
                    props: {
                        dataset,
                        plotlySpec,
                        error: true
                    }
                }
            }
        }
    }

}