import random

def set_turns(dice):
    global turns, user_score, computer_score
    turns = dice
    user_score = 0
    computer_score = 0
    return turns
    

def game():
    global turns, user_score, computer_score
    turns = int(turns)
    # if turns > 0: 
    dice_user = random.randint(1,6)
    dice_computer = random.randint(1, 6)
    user_score = user_score + dice_user
    computer_score = computer_score + dice_computer
    turns -= 1
    return {'user_roll':dice_user, 'computer_roll':dice_computer}
    # else:
    #     return {'round': 'round over'}
    
def score():
    
    global user_score, computer_score
    if user_score > computer_score:
        winner = 'User Win!'
    elif user_score < computer_score:
        winner = 'Computer Win!'
    else:
        winner = 'Tie'

    return {
        'user_score': user_score,
        'computer_score': computer_score,
        'winner': winner
    }


    
