// import { shallow } from "enzyme";
import { render } from '@testing-library/react';
import path from 'path'
import Home from '../../pages/index';
import { getDataset } from "../../lib/dataset"
import { addView } from '../../lib/utils'


let plotlyDatasetWithView

beforeAll(async () => {
    const plotlyDatasetsDirectory = path.join(process.cwd(), 'fixtures', 'datasetsPlotlyView')

    const plotlyDataset = await getDataset(plotlyDatasetsDirectory)
    plotlyDatasetWithView = addView(plotlyDataset)
});


/** @test {Home Component} */
describe('Home Component', () => {
    it('should render without crashing', () => {
        const dataset = plotlyDatasetWithView.props.dataset
        const specs = plotlyDatasetWithView.props.specs
        const { container, getAllByText} = render(<Home dataset={dataset} specs={specs} />)
        expect(getAllByText('VIX - CBOE Volatility Index').length > 0).toEqual(true)
        expect(container.querySelector('graph')).toMatchSnapshot()

    });
});