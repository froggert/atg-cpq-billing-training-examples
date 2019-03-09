public with sharing class AccountTriggerHandlerExample extends TriggerHandler {

    public AccountTriggerHandlerExample() {

    }

    /**
     * Override any methods you want to implement
     * Access Trigger.new/newMap/old/oldMap ONLY from override methods
     *
     * DO NOT put any business logic in override methods. You can do some filters on the records before passing to other business logic handlers,
     * but it should be very basic and simple
     *
     */

    //overrides
    protected override void beforeInsert() {
      upadteSomeStuffOnAccount(Trigger.new);
    }

    protected override void afterInsert() {
      // Example of calling an outside helper to perform some business logic
      AccountHelper.sendAccountToNetSuite(Trigger.new);
    }

    protected override void beforeUpdate() {
      // Example of filtering out records before passing to other business logic
      // This can make the methods doing business logic be very focused and easier to test
      List<Account> accountsWithNameChange = ApexUtils.findRecsWithChangedValues(Trigger.new, Trigger.oldMap, Account.LastName);
      if(accountsWithNameChange.size() > 0) {
        // call some other method to handle business logic
        doStuffAfterNameChange(accountsWithNameChange);
      }
    }

    protected override void afterUpdate() {
      
    }

    /**
     * Business Logic methods
     * Create additional business logic classes as needed
     * Simple trigger handlers can have logic housed here to be contained
     */
    @TestVisible
    private void upadteSomeStuffOnAccount(List<Account> accounts) {

      for(Account account : accounts) {
        // Business Logic
      }

    }

    @TestVisible
    private void doStuffAfterNameChange(List<Account> accounts) {
      // Business Logic
    }

  }