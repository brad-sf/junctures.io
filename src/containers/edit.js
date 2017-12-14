import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import JunctureForm from '../components/junctures/form';

const mapStateToProps = (state) => {
	return {
		onSubmit: () => {},
		juncture: {
			name: 'Mobx',
			dateTime: 77,
			id: 88
		}
	}
};

const JunctureEditContainer = (props) => (
	<JunctureForm
		{...props}
	/>
);

JunctureEditContainer.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	juncture: PropTypes.object
};

export default connect(mapStateToProps)(JunctureEditContainer);