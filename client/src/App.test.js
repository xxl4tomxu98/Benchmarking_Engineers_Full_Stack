import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { render, fireEvent, cleanup } from '@testing-library/react';

import 'jest-dom/extend-expect';


const renderApp = (candidates) => render(<App candidates = {candidates}/>);

const testIds = {
  candidate_id: "candidate-id",
  communication_percentile: "communication-percentile",
  coding_percentile: "coding-percentile",
};

const candidates = [889, 897, 898, 908, 912, 913];

const nonExistCandidates = [100, 200, 300, 400, 600, 800, 821, 1000];

beforeEach(() => {
});

afterEach(() => {
  cleanup();
});

test('Initial UI renders correctly', () => {
  const { getByTestId } = renderApp(candidates);

  const candidate_id = getByTestId(testIds.candidate_id);
  expect(candidate_id).toBeVisible();
  expect(candidate_id).toHaveValue(889);

  const communication_percentile = getByTestId(testIds.communication_percentile);
  expect(communication_percentile).toBeVisible();
  expect(communication_percentile).toHaveValue(0);
  expect(communication_percentile).toHaveAttribute('readOnly');

  const coding_percentile = getByTestId(testIds.coding_percentile);
  expect(coding_percentile).toBeVisible();
  expect(coding_percentile).toHaveValue(0);
  expect(coding_percentile).toHaveAttribute('readOnly');
});

test('Input not matching candidate_id shows no return percentiles', () => {
  const { getByTestId } = renderApp(candidates);
  const candidate_id = getByTestId(testIds.candidate_id);
  const communication_percentile = getByTestId(testIds.communication_percentile);
  const coding_percentile = getByTestId(testIds.coding_percentile);
  for (let key of nonExistCandidates) {
    fireEvent.change(candidate_id, { target: { value: key }});
    expect(communication_percentile).toHaveValue("no candidate_id exist");
    expect(coding_percentile).toHaveValue("no candidate_id exist");
  }
});

test('Test with existing candidates', () => {
  const { getByTestId } = renderApp(candidates);
  const candidate_id = getByTestId(testIds.candidate_id);
  const communication_percentile = getByTestId(testIds.communication_percentile);
  const coding_percentile = getByTestId(testIds.coding_percentile);

  candidates.forEach((value, key) => {
    fireEvent.change(candidate_id, { target: { value: key }});
    expect(communication_percentile).toHaveValue(value);
    expect(coding_percentile).toHaveValue(value);
  });
});

test('Test with existing candidates followed by non-existing ones', () => {
  const { getByTestId } = renderApp(candidates);
  const candidate_id = getByTestId(testIds.candidate_id);
  const communication_percentile = getByTestId(testIds.communication_percentile);
  const coding_percentile = getByTestId(testIds.coding_percentile);

  const existing = 889;
  const nonExisting = 884;

  fireEvent.change(candidate_id, { target: { value: existing }});
  expect(communication_percentile).toHaveValue(candidates.get(existing));
  expect(coding_percentile).toHaveValue(candidates.get(existing));
  fireEvent.change(candidate_id, { target: { value: nonExisting }});
  expect(communication_percentile).toHaveValue("no candidate_id exist");
  expect(coding_percentile).toHaveValue("no candidate_id exist");
});


test('Test with non-existing candidates followed by existing ones', () => {
  const { getByTestId } = renderApp(candidates);
  const candidate_id = getByTestId(testIds.candidate_id);
  const communication_percentile = getByTestId(testIds.communication_percentile);
  const coding_percentile = getByTestId(testIds.coding_percentile);

  const existing = 889;
  const nonExisting = 884;

  fireEvent.change(candidate_id, { target: { value: nonExisting }});
  expect(communication_percentile).toHaveValue("no candidate_id exist");
  expect(coding_percentile).toHaveValue("no candidate_id exist");

  fireEvent.change(candidate_id, { target: { value: existing }});
  expect(communication_percentile).toHaveValue(candidates.get(existing));
  expect(coding_percentile).toHaveValue(candidates.get(existing));

});
