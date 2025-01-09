import {duplojsEslintOpen} from "@duplojs/eslint";
import eslintPluginReact from "eslint-plugin-react";

const reactRecommandedConfig = eslintPluginReact.configs.flat.all

export default [
	{
		...duplojsEslintOpen,
		plugins: {
			...duplojsEslintOpen.plugins,
			...reactRecommandedConfig.plugins,
		},
		languageOptions: {
			...duplojsEslintOpen.languageOptions,
			parserOptions: {
				project: false,
				projectService: true,
				allowDefaultProject: ['*.ts', '*.tsx'],
				ecmaFeatures: {
					jsx: true,
				},
			}
		},
		rules: {
			...duplojsEslintOpen.rules,
			...reactRecommandedConfig.rules,
			"react/jsx-filename-extension": ["error", { "extensions": [".tsx"] }],
			"react/react-in-jsx-scope": "off",
			"react/jsx-indent": ["error", "tab"],
			"react/jsx-indent-props": [1, "tab"],
			"react/jsx-no-bind": "off",
			"react/require-default-props": "off",
			"react/jsx-no-leaked-render": "off",
			"react/jsx-closing-bracket-location": "off",
			"react/jsx-props-no-spreading": "off",
			"treact/jsx-no-literals": "off",
			"react/forbid-component-props": "off",
		},
		files: ["**/*.{ts,tsx}"],
	},
	{
		ignores: ["coverage", "dist"]
	}
];
