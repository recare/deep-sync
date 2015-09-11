'use strict';

import testContext from './testContext';
import deepequal from 'deep-equal';

const testConfig = testContext.config;
testContext.prepare()();

import deepSync from '../src/index';
import {TypeError} from '../src/errors';

describe('DeepSync', function () {

    let baseObject;

    beforeEach(()=> {
        baseObject = {
            firstLevel: {
                secondLevel: 'secondLevelKeyValue',
                secondLevel2: 'secondLevelKeyValue2',
                secondLevel3: {
                    thidLevel: 'thirdLevelValue'
                }
            }
        }
    });

    it('throws a type error if input is not two objects.', (done) => {
        () => { deepSync({}, 'test') }.should.throw(TypeError);
        () => { deepSync(null, null) }.should.throw(TypeError);
        () => { deepSync([], []) }.should.throw(TypeError);
        () => { deepSync({}) }.should.throw(TypeError);
        done();
    });

    it('should add fields to the target that are present in the source', (done) => {
        let targetObject = {};
        let testObj = deepSync(targetObject, baseObject)
        deepequal(testObj,baseObject).should.equal(true);
        done();
    });

    it('should remove fields from the target that do not exist in the source', (done) => {
        let targetObject = {
            firstLevel2: 'test'
        };

        let testObj = deepSync(targetObject, baseObject);
        deepequal(testObj,baseObject).should.equal(true);
        done();
    });

    it('should not overwrite values that are already existing in the target', (done) => {
        let targetObject = {
            firstLevel: {
                secondLevel: 'different value'
            }
        };

        let testObject = deepSync(targetObject, baseObject);
        testObject.firstLevel.secondLevel.should.equal('different value');
        done();
    });

    it('should not overwrite values that are already existing in the target if overwrite is true', (done) => {
        let targetObject = {
            firstLevel: {
                secondLevel: 'different value'
            }
        };

        let testObject = deepSync(targetObject, baseObject, true);
        testObject.firstLevel.secondLevel.should.equal('secondLevelKeyValue');
        deepequal(testObject, baseObject).should.equal(true);
        done();
    })
});