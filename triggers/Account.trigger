trigger AccountTriggerExample on Account (before insert, after insert, before update, after update) {

    new AccountTriggerHandlerExample().run();

}