const steps = [ 'User Login', 'Shipping Address', 'Payment Method', 'Place Order' ];

export default function CheckoutWizard({ currentStep = 1 }) {
  return (
    <div className="flex-center flex-wrap gap-2 pb-5">
        {steps.map((step, i) => (
            <div 
                key={i} 
                className={`flex-1 font-semibold border-b-2 text-center pb-3
                    ${i + 1 <= currentStep? 
                        'border-amber-400 text-amber-400' 
                        : 'border-gray-400 text-gray-400'}`}
            >
                {step}
            </div>
        ))}
    </div>
  )
}
