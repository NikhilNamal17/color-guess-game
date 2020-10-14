context('Coulor Guessing Game', () => {
	it('should start game on hard level', () => {
		cy.visit('/')
		cy.get('h1').contains('Colour guessing Game')
		cy.get('.mode.selected').contains('Hard')
	})

	it('should start a new game', () => {
		cy.get('.square').eq(0).invoke('css', 'background').then(background => {
			cy.get('#reset').click().then(() => {
				cy.wait(500)
				cy.get('.square').eq(0).invoke('css', 'background').then(newBackground => {
					cy.log(background)
					cy.log(newBackground)
					expect(newBackground).not.be.equal(background)
				})
			})
		})
	})

	it('should change to easy level', () => {
		cy.get('.mode').contains('Easy').click()
		cy.get('.square:visible').should('have.length', 3)
	})

	it('should change to easy super hard', () => {
		cy.get('.mode').contains('Super Hard').click()
		cy.get('.square:visible').should('have.length', 9)
	})

	it('should guess the right color', () => {
		cy.get('#colorDisplay').invoke('text').then(color => {
			cy.get('.square').each(($square) => {
				const squareBg = $square.css('backgroundColor')
				if (squareBg == color) {
					$square.click()
					cy.get('#message').contains('Correct!')
					return false
				}
			})
		})
	})

	it('should guess the wrong color', () => {
		cy.get('#reset').click()
		cy.get('#colorDisplay').invoke('text').then(color => {
			cy.get('.square').each(($square) => {
				const squareBg = $square.css('backgroundColor')
				cy.log(squareBg, color)
				if (squareBg != color) {
					$square.click()
					cy.get('#message').contains('Try Again')
					return false
				}
			})
		})
	})
})
