import {test} from 'node:test';
import assert from 'node:assert/strict';
import {initial,validate,streaks,due} from './model.js';
test('initial data and JSON roundtrip are valid',()=>{const s=initial();assert.equal(validate(JSON.parse(JSON.stringify(s))).habits.length,6)});
test('streak spans months and accepts an unfinished today',()=>{const s=initial();s.checks={'2026-10-30':['start-0'],'2026-10-31':['start-0'],'2026-11-01':['start-1']};assert.deepEqual(streaks(s,'2026-11-02'),{best:3,current:3});assert.deepEqual(streaks(s,'2026-11-03'),{best:3,current:0})});
test('removing a habit preserves historical XP and streak',()=>{const s=initial();s.habits[0].archived=true;s.checks={'2026-11-01':['start-0']};assert.equal(validate(s),s);assert.equal(due(s.habits[0],'2026-11-01'),false);assert.equal(streaks(s,'2026-11-01').current,1)});
test('malformed backups and unknown completions are rejected',()=>{const s=initial();s.checks={'2026-11-01':['unknown']};assert.throws(()=>validate(s));assert.throws(()=>validate({version:1}));const t=initial();t.habits[0].color='url(external)';assert.throws(()=>validate(t))});
test('custom schedule respects weekday and creation date',()=>{const h={...initial().habits[0],created:'2026-11-01',days:[1]};assert.equal(due(h,'2026-11-02'),true);assert.equal(due(h,'2026-11-03'),false);assert.equal(due(h,'2026-10-26'),false)});
