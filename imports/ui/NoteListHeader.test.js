import React from "react";
import expect from "expect";
import { mount } from "enzyme";
import { Meteor } from "meteor/meteor";

import { NoteListHeader } from "./NodeListHeader";
import {notes} from '../fixtures/fixtures';

if (Meteor.isClient) {
    describe('NoteListHeader', function() {
        let meteorCall;
        let Session;

        beforeEach(function() {
            meteorCall = expect.createSpy();
            Session = {
                set: expect.createSpy()
            }
        })

        it('should not set session for failed insert', function() {
            const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session}/>);
            wrapper.find('button').simulate('click');
            meteorCall.calls[0].arguments[1]({}, undefined);

            expect(meteorCall.calls[0].arguments[0]).toBe("notes.insert");
            expect(Session.set).toNotHaveBeenCalled();
        });


    });
}
