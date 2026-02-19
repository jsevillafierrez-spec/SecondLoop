import {render, screen } from '@testing-library/react';
import {test, expect} from "vitest";
import Header from '../componentes/layout/Header.jsx';

test('Muestra el titulo del portfolio', () => {
    render(<Header/>);
    expect(screen.getByText('SecondLoop')).toBeInTheDocument();
});