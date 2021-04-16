/**
 * WordPress dependencies
 */
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
	...defaultConfig,
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.mp3$/,
				loader: 'file-loader',
				options: {
					name: 'sounds/[name].[ext]',
				},
			},
		],
	},
};
