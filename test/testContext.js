import chai from 'chai';

function setTestHeader () {
    return () => {
        chai.should();
    };
}

const testContext = {
    prepare: setTestHeader
};

export default testContext;