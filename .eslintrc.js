module.exports = {
	extends: [ 'plugin:@wordpress/eslint-plugin/recommended', 'prettier' ],
	rules: {
		'@wordpress/dependency-group': 'warn',
		'@wordpress/i18n-text-domain': [
			'error',
			{
				allowedTextDomain: 'sensei-bonsai-gamification',
			},
		],
		'import/no-extraneous-dependencies': 'off',
		'react-hooks/exhaustive-deps': 'warn',
		'import/no-unresolved': 'off',
	},
};
