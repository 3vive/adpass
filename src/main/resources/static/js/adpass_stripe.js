(function(window)
{
    //------------------------------------------------------------
    // ADPassStripe
    //------------------------------------------------------------
    function AdPassStripe(key)
    {
        //------------------------------------------------------------
        // INSTANCE VARS
        //------------------------------------------------------------
        this._key           = key;
        this._card          = null;
        this._elements      = null;
        this._stripe        = null;
        this._errorElement  = document.getElementById('card-errors');
        this._form          = document.getElementById('payment-form');


        //------------------------------------------------------------
        // PRIVATE METHODS
        //------------------------------------------------------------

        /**
         * setup_elements()
         *
         * @returns {ADPassStripe}
         */
        this._setup_elements = function()
        {
            this._elements = this._stripe.elements();

            return this;
        };

        /**
         * setup_event_hdlrs();
         *
         * @returns {ADPassStripe}
         */
        this._setup_event_hdlrs = function()
        {
            var _this = this;

            /* setup event listeners */
            if (this._card)
            {
                this._card.addEventListener('change', function(event)
                {
                    if (event.error)
                    {
                        _this._errorElement.textContent = event.error.message;
                    }
                    else
                    {
                        _this._errorElement.textContent = '';
                    }
                });
            }
            else
            {
                throw "Stripe 'card' object not created.";
            }


            /* form submision */
            if (this._form)
            {
                this._form.addEventListener('submit', function(event)
                {
                    event.preventDefault();

                    _this._stripe.createToken(_this._card).then(function(result)
                    {
                        /* handle errors */
                        if (result.error)
                        {
                            _this._errorElement.textContent = result.error.message;
                        }
                        /* submit token to server */
                        else
                        {
                            _this._submit_token_to_server(result.token);
                        }
                    });
                });
            }
            else
            {
                throw "Form element is not set.";
            }

            return this;
        };

        /**
         * setup_card()
         *
         * @returns {ADPassStripe}
         */
        this._setup_card = function()
        {
            var _this = this;

            if (this._elements)
            {
                /* create card element */
                this._card = this._elements.create('card',
                    {
                        style:
                            {
                                base:
                                {
                                    color           : '#32325d',
                                    lineHeight      : '18px',
                                    fontFamily      : '"Helvetica Neue", Helvetica, sans-serif',
                                    fontSmoothing   : 'antialiased',
                                    fontSize        : '16px',
                                    '::placeholder' :
                                    {
                                        color: '#aab7c4'
                                    }
                                },

                                invalid:
                                {
                                    color           : '#fa755a',
                                    iconColor       : '#fa755a'
                                }
                            }
                    });

                /* mount to DOM */
                this._card.mount('#card-element');
            }
            else
            {
                throw "Stripe 'elements' object not created.";
            }

            return this;
        };

        /**
         * submit_token_to_server()
         *
         * @param token
         */
        this._submit_token_to_server = function(token)
        {
            var hiddenInput = document.createElement('input');

            hiddenInput.setAttribute('type', 'hidden');
            hiddenInput.setAttribute('name', 'stripeToken');
            hiddenInput.setAttribute('value', token.id);

            this._form.appendChild(hiddenInput);

            // Submit the form
            alert('Need to implement server-side to accept token: ' + token.id);
            //this._form.submit();
        };


        //------------------------------------------------------------
        // SETUP STRIPE INSTANCE
        //------------------------------------------------------------
        if (key)
        {
            this._stripe = Stripe(this._key);
        }
        else
        {
            throw "Failed to instantiate a stripe instance: Invalid key.";
        }

        this._setup_elements();
        this._setup_card();
        this._setup_event_hdlrs();


        return this;
    }


    //------------------------------------------------------------
    // INITIALIZE
    //------------------------------------------------------------
    document.addEventListener("DOMContentLoaded", function (event)
    {

        try
        {
            new AdPassStripe('pk_test_QQdoP5IFrqLYmzAwjzSBysB5');
        }
        catch (e)
        {
            /* something bad happened if we get here :) */
            console.log(e);
        };

    });

})(window);

